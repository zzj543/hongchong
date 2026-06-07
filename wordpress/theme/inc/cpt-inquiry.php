<?php
/**
 * Custom Post Type: Inquiry
 * Handles RFQ submissions from the Next.js frontend
 */

// Register Inquiry CPT (not publicly accessible)
add_action('init', function () {
    register_post_type('inquiry', [
        'labels' => [
            'name'               => 'Inquiries',
            'singular_name'      => 'Inquiry',
            'add_new'            => 'Add Inquiry',
            'all_items'          => 'All Inquiries',
            'search_items'       => 'Search Inquiries',
        ],
        'public'              => false,          // Hidden from frontend
        'publicly_queryable'  => false,          // Not queryable via REST
        'show_in_rest'        => false,          // NOT exposed to REST API
        'show_ui'             => true,           // Visible in admin
        'supports'            => ['title'],
        'menu_icon'           => 'dashicons-email-alt',
        'menu_position'       => 6,
    ]);
});

// Inquiry status taxonomy
add_action('init', function () {
    register_taxonomy('inquiry_status', 'inquiry', [
        'labels' => [
            'name'              => 'Inquiry Status',
            'singular_name'     => 'Status',
        ],
        'hierarchical'       => false,
        'show_in_rest'       => false,
        'show_admin_column'  => true,
    ]);
});

// Insert default inquiry statuses
add_action('init', function () {
    $statuses = [
        'new'            => 'New',
        'qualified'      => 'Qualified',
        'need-more-info' => 'Need More Info',
        'quoted'         => 'Quoted',
        'sample-sent'    => 'Sample Sent',
        'won'            => 'Won',
        'lost'           => 'Lost',
        'spam'           => 'Spam',
    ];
    foreach ($statuses as $slug => $name) {
        if (!term_exists($slug, 'inquiry_status')) {
            wp_insert_term($name, 'inquiry_status', ['slug' => $slug]);
        }
    }
});

// Add inquiry status column to admin list
add_filter('manage_inquiry_posts_columns', function ($columns) {
    $columns['inquiry_status'] = 'Status';
    $columns['inquiry_company'] = 'Company';
    $columns['inquiry_country'] = 'Country';
    $columns['inquiry_email'] = 'Email';
    unset($columns['date']);
    $columns['date'] = 'Date';
    return $columns;
});

add_action('manage_inquiry_posts_custom_column', function ($column, $post_id) {
    $fields = [
        'inquiry_status'  => 'status',
        'inquiry_company' => 'company',
        'inquiry_country' => 'country',
        'inquiry_email'   => 'email',
    ];
    if (isset($fields[$column])) {
        echo esc_html(get_post_meta($post_id, $fields[$column], true) ?: '—');
    }
}, 10, 2);

// Custom inquiry meta box in admin
add_action('add_meta_boxes', function () {
    add_meta_box('inquiry_details', 'Inquiry Details', function ($post) {
        $fields = [
            'name'     => 'Name',
            'company'  => 'Company',
            'email'    => 'Email',
            'phone'    => 'Phone / WhatsApp',
            'country'  => 'Country',
            'products' => 'Interested Products',
            'quantity' => 'Estimated Quantity',
            'target_market' => 'Target Market',
            'custom_requirements' => 'Custom Requirements',
            'message'  => 'Message',
            'source_url' => 'Source URL',
        ];
        echo '<table class="form-table">';
        foreach ($fields as $key => $label) {
            $val = esc_html(get_post_meta($post->ID, $key, true));
            echo "<tr><th style='width:150px'>{$label}</th><td>";
            if ($key === 'message') {
                echo "<textarea readonly rows='4' style='width:100%'>{$val}</textarea>";
            } else {
                echo "<input type='text' readonly value='{$val}' style='width:100%' />";
            }
            echo "</td></tr>";
        }
        echo '</table>';
    }, 'inquiry', 'normal', 'high');
});
