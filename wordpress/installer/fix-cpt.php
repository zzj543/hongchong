<?php
/**
 * Plugin Name: HongChong CPT Fix
 * Description: Register product CPT and inquiry REST endpoint directly via plugin
 */

// Product CPT
add_action('init', function() {
    register_post_type('product', [
        'labels' => ['name' => 'Products', 'singular_name' => 'Product'],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'products',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'slug'],
        'taxonomies' => ['product_category'],
        'menu_icon' => 'dashicons-products',
        'has_archive' => true,
        'rewrite' => ['slug' => 'products'],
    ]);
});

// Product Category taxonomy
add_action('init', function() {
    register_taxonomy('product_category', 'product', [
        'labels' => ['name' => 'Product Categories'],
        'hierarchical' => true,
        'show_in_rest' => true,
        'rest_base' => 'product-categories',
        'rewrite' => ['slug' => 'glass-containers'],
    ]);
});

// Inquiry CPT
add_action('init', function() {
    register_post_type('inquiry', [
        'labels' => ['name' => 'Inquiries', 'singular_name' => 'Inquiry'],
        'public' => false,
        'publicly_queryable' => false,
        'show_in_rest' => false,
        'show_ui' => true,
        'supports' => ['title'],
        'menu_icon' => 'dashicons-email-alt',
    ]);
});

// Inquiry REST endpoint
add_action('rest_api_init', function() {
    register_rest_route('inquiry/v1', '/submit', [
        'methods' => 'POST',
        'callback' => 'handle_inquiry_submit',
        'permission_callback' => '__return_true',
    ]);
});

function handle_inquiry_submit($request) {
    $params = $request->get_params();

    if (!empty($params['website'])) {
        return new WP_Error('spam', '', ['status' => 400]);
    }

    $required = ['name', 'company', 'email', 'country', 'message'];
    foreach ($required as $field) {
        if (empty($params[$field])) {
            return new WP_Error('missing_field', "{$field} is required.", ['status' => 400]);
        }
    }

    $post_id = wp_insert_post([
        'post_type' => 'inquiry',
        'post_title' => sanitize_text_field($params['name']) . ' — ' . sanitize_text_field($params['company']),
        'post_status' => 'publish',
    ]);

    if (is_wp_error($post_id)) {
        return new WP_Error('db_error', 'Failed to save inquiry.', ['status' => 500]);
    }

    $fields = ['name', 'company', 'email', 'phone', 'country', 'products', 'quantity', 'message'];
    foreach ($fields as $field) {
        if (isset($params[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field($params[$field]));
        }
    }
    update_post_meta($post_id, 'status', 'new');

    // Notify admin
    $admin_email = get_option('admin_email');
    wp_mail($admin_email, "New Inquiry: {$params['company']} — {$params['country']}",
        "Name: {$params['name']}\nCompany: {$params['company']}\nEmail: {$params['email']}\nCountry: {$params['country']}\nProducts: {$params['products']}\nQuantity: {$params['quantity']}\nMessage: {$params['message']}");

    return ['success' => true, 'message' => 'Inquiry submitted successfully.'];
}

// Flush rewrite rules on activation
register_activation_hook(__FILE__, function() {
    flush_rewrite_rules();
});
register_deactivation_hook(__FILE__, 'flush_rewrite_rules');
