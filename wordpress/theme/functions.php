<?php
/**
 * HongChong Glass — WordPress Headless Theme
 *
 * This theme powers the backend CMS for HongChong Glass.
 * Frontend is built with Next.js consuming the REST API.
 *
 * Upload this folder to: /wp-content/themes/hongchong-theme/
 * Then activate via: Appearance → Themes
 */

// Load custom modules
require_once __DIR__ . '/inc/cpt-products.php';
require_once __DIR__ . '/inc/cpt-inquiry.php';
require_once __DIR__ . '/inc/cpt-misc.php';
require_once __DIR__ . '/inc/rest-api.php';
require_once __DIR__ . '/inc/email.php';
require_once __DIR__ . '/inc/seo-helpers.php';

// Theme setup
add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');

    // Register nav menus
    register_nav_menus([
        'primary' => 'Primary Navigation',
        'footer'  => 'Footer Navigation',
    ]);
});

// Disable WooCommerce features (WooCommerce is installed but we don't use it)
add_filter('woocommerce_enqueue_styles', '__return_empty_array');
remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');

// Disable frontend for headless mode
add_action('template_redirect', function () {
    if (!is_admin() && !wp_doing_ajax() && !wp_is_json_request()) {
        // Redirect to admin if someone visits the WP frontend
        wp_redirect(admin_url());
        exit;
    }
});

// Enable CORS for Next.js frontend
add_action('init', function () {
    $origin = defined('FRONTEND_URL') ? FRONTEND_URL : '*';
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
});

// Set REST API items per page to 100 max
add_filter('rest_product_query', function ($args) {
    $args['posts_per_page'] = min($args['posts_per_page'] ?? 10, 100);
    return $args;
});

// Hide admin bar for non-admins
add_filter('show_admin_bar', function () {
    return current_user_can('administrator');
});
