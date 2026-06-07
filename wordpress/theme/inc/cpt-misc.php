<?php
/**
 * Custom Post Types: Certification, Case, Download
 */

// Certification CPT
add_action('init', function () {
    register_post_type('certification', [
        'labels' => [
            'name'          => 'Certifications',
            'singular_name' => 'Certification',
        ],
        'public'         => true,
        'show_in_rest'   => true,
        'rest_base'      => 'certifications',
        'supports'       => ['title', 'thumbnail', 'excerpt'],
        'menu_icon'      => 'dashicons-awards',
        'menu_position'  => 7,
    ]);
});

// Case Study CPT
add_action('init', function () {
    register_post_type('case', [
        'labels' => [
            'name'          => 'Case Studies',
            'singular_name' => 'Case Study',
        ],
        'public'         => true,
        'show_in_rest'   => true,
        'rest_base'      => 'cases',
        'supports'       => ['title', 'editor', 'thumbnail', 'excerpt'],
        'menu_icon'      => 'dashicons-portfolio',
        'menu_position'  => 8,
    ]);
});

// Download CPT
add_action('init', function () {
    register_post_type('download', [
        'labels' => [
            'name'          => 'Downloads',
            'singular_name' => 'Download',
        ],
        'public'         => true,
        'show_in_rest'   => true,
        'rest_base'      => 'downloads',
        'supports'       => ['title', 'thumbnail'],
        'menu_icon'      => 'dashicons-download',
        'menu_position'  => 9,
    ]);
});

// ACF fields for Case Studies
if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group([
        'key'    => 'group_case_study',
        'title'  => 'Case Study Details',
        'fields' => [
            ['key' => 'field_case_country', 'label' => 'Country', 'name' => 'country', 'type' => 'text'],
            ['key' => 'field_case_industry', 'label' => 'Industry', 'name' => 'industry', 'type' => 'text'],
            ['key' => 'field_case_product_type', 'label' => 'Product Type', 'name' => 'product_type', 'type' => 'text'],
            ['key' => 'field_case_requirement', 'label' => 'Client Requirement', 'name' => 'requirement', 'type' => 'textarea'],
            ['key' => 'field_case_solution', 'label' => 'Our Solution', 'name' => 'solution', 'type' => 'textarea'],
            ['key' => 'field_case_result', 'label' => 'Result', 'name' => 'result', 'type' => 'textarea'],
        ],
        'location' => [[[['param' => 'post_type', 'operator' => '==', 'value' => 'case']]]],
        'show_in_rest' => true,
    ]);
}

// ACF fields for Certifications
if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group([
        'key'    => 'group_certification',
        'title'  => 'Certification Details',
        'fields' => [
            ['key' => 'field_cert_scope', 'label' => 'Scope', 'name' => 'scope', 'type' => 'text'],
            ['key' => 'field_cert_valid_until', 'label' => 'Valid Until', 'name' => 'valid_until', 'type' => 'date_picker'],
            ['key' => 'field_cert_file', 'label' => 'Certificate File', 'name' => 'cert_file', 'type' => 'file'],
        ],
        'location' => [[[['param' => 'post_type', 'operator' => '==', 'value' => 'certification']]]],
        'show_in_rest' => true,
    ]);
}

// ACF fields for Downloads
if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group([
        'key'    => 'group_download',
        'title'  => 'Download Details',
        'fields' => [
            ['key' => 'field_dl_type', 'label' => 'Type', 'name' => 'dl_type', 'type' => 'select', 'choices' => [
                'catalog'     => 'Product Catalog',
                'spec'        => 'Specification Sheet',
                'test_report' => 'Test Report',
                'packaging'   => 'Packaging Guide',
                'other'       => 'Other',
            ]],
            ['key' => 'field_dl_file', 'label' => 'File', 'name' => 'dl_file', 'type' => 'file'],
        ],
        'location' => [[[['param' => 'post_type', 'operator' => '==', 'value' => 'download']]]],
        'show_in_rest' => true,
    ]);
}
