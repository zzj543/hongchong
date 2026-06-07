<?php
/**
 * SEO helpers for WordPress headless
 */

// Disable XML-RPC (security)
add_filter('xmlrpc_enabled', '__return_false');

// Disable user enumeration via REST
add_filter('rest_endpoints', function ($endpoints) {
    if (isset($endpoints['/wp/v2/users'])) {
        unset($endpoints['/wp/v2/users']);
    }
    return $endpoints;
});

// Remove unnecessary REST links from head
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('wp_head', 'wp_oembed_add_discovery_links');
remove_action('wp_head', 'wp_shortlink_wp_header');

// Remove generator tag
remove_action('wp_head', 'wp_generator');

// Trigger frontend rebuild when content changes (Vercel/Cloudflare webhook)
add_action('save_post', function ($post_id, $post, $update) {
    if (wp_is_post_revision($post_id)) return;
    if ($post->post_status !== 'publish') return;

    $webhook_url = defined('DEPLOY_WEBHOOK_URL') ? DEPLOY_WEBHOOK_URL : '';
    if ($webhook_url) {
        wp_remote_post($webhook_url, [
            'blocking' => false,
            'timeout'  => 1,
        ]);
    }
}, 20, 3);

// Clear REST cache on product update
add_action('save_post_product', function ($post_id, $post, $update) {
    if (wp_is_post_revision($post_id)) return;
    if ($post->post_status !== 'publish') return;

    // WP REST Cache integration
    if (function_exists('wp_rest_cache_clear')) {
        wp_rest_cache_clear("/wp/v2/products");
        wp_rest_cache_clear("/wp/v2/products/{$post_id}");
    }
}, 10, 3);
