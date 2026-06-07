<?php
/**
 * Custom REST API Endpoints
 */

add_action('rest_api_init', function () {
    // Inquiry submission endpoint
    register_rest_route('inquiry/v1', '/submit', [
        'methods'             => 'POST',
        'callback'            => 'handle_inquiry_submit',
        'permission_callback' => '__return_true',
    ]);
});

function handle_inquiry_submit($request) {
    $params = $request->get_params();

    // === Anti-Spam ===
    // 1. Honeypot
    if (!empty($params['website'])) {
        return new WP_Error('spam', '', ['status' => 400]);
    }

    // 2. Rate limit by IP
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $rate_key = 'inquiry_rate_' . md5($ip);
    if (get_transient($rate_key)) {
        return new WP_Error('rate_limit', 'Please wait 5 minutes before submitting again.', ['status' => 429]);
    }
    set_transient($rate_key, true, 300); // 5 minute cooldown

    // 3. Basic content spam check
    $total_text = ($params['message'] ?? '') . ($params['name'] ?? '') . ($params['company'] ?? '');
    if (strlen($total_text) < 10) {
        return new WP_Error('invalid', 'Message too short.', ['status' => 400]);
    }

    // === Validate Required Fields ===
    $required = ['name', 'company', 'email', 'country', 'message'];
    foreach ($required as $field) {
        if (empty($params[$field])) {
            return new WP_Error('missing_field', "{$field} is required.", ['status' => 400]);
        }
    }

    if (!is_email($params['email'])) {
        return new WP_Error('invalid_email', 'Invalid email address.', ['status' => 400]);
    }

    // === Create Inquiry CPT ===
    $title = sanitize_text_field($params['name']) . ' — ' . sanitize_text_field($params['company']);
    $post_id = wp_insert_post([
        'post_type'   => 'inquiry',
        'post_title'  => $title,
        'post_status' => 'publish',
    ]);

    if (is_wp_error($post_id)) {
        return new WP_Error('db_error', 'Failed to save inquiry.', ['status' => 500]);
    }

    // === Save Meta Fields ===
    $fields = [
        'name', 'company', 'email', 'phone', 'country',
        'products', 'quantity', 'target_market', 'custom_requirements',
        'message', 'source_url',
    ];
    foreach ($fields as $field) {
        if (isset($params[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field($params[$field]));
        }
    }
    update_post_meta($post_id, 'status', 'new');
    update_post_meta($post_id, 'ip_address', $ip);

    // Set inquiry status taxonomy
    wp_set_object_terms($post_id, 'new', 'inquiry_status');

    // === Send Notification Emails ===
    send_inquiry_notification($post_id, $params);
    send_inquiry_autoreply($params);

    // === Return Success ===
    return [
        'success' => true,
        'message' => 'Inquiry submitted successfully. We will reply within 24 business hours.',
    ];
}
