<?php
/**
 * Custom Post Type: Product
 * Custom Taxonomy: Product Category
 */

// Register Product CPT
add_action('init', function () {
    register_post_type('product', [
        'labels' => [
            'name'               => 'Products',
            'singular_name'      => 'Product',
            'add_new'            => 'Add Product',
            'add_new_item'       => 'Add New Product',
            'edit_item'          => 'Edit Product',
            'all_items'          => 'All Products',
            'search_items'       => 'Search Products',
            'not_found'          => 'No products found.',
        ],
        'public'              => true,
        'show_in_rest'        => true,
        'rest_base'           => 'products',
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'slug', 'custom-fields'],
        'taxonomies'          => ['product_category'],
        'menu_icon'           => 'dashicons-products',
        'has_archive'         => true,
        'rewrite'             => ['slug' => 'products'],
        'menu_position'       => 5,
    ]);
});

// Register Product Category taxonomy
add_action('init', function () {
    register_taxonomy('product_category', 'product', [
        'labels' => [
            'name'              => 'Product Categories',
            'singular_name'     => 'Product Category',
            'search_items'      => 'Search Categories',
            'all_items'         => 'All Categories',
            'parent_item'       => 'Parent Category',
            'add_new_item'      => 'Add New Category',
        ],
        'hierarchical'       => true,          // Supports nesting: Bottles > Beverage Bottles
        'show_in_rest'       => true,
        'rest_base'          => 'product-categories',
        'show_admin_column'  => true,
        'rewrite'            => ['slug' => 'glass-containers'],
    ]);
});

// Register ACF fields for products (programmatic — no GUI dependency)
if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group([
        'key'    => 'group_product_specs',
        'title'  => 'Product Specifications',
        'fields' => [
            [
                'key'   => 'field_sku',
                'label' => 'SKU',
                'name'  => 'sku',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_material',
                'label' => 'Material',
                'name'  => 'material',
                'type'  => 'text',
                'instructions' => 'e.g., High Borosilicate Glass, Soda-Lime Glass',
            ],
            [
                'key'   => 'field_capacity',
                'label' => 'Capacity',
                'name'  => 'capacity',
                'type'  => 'text',
                'instructions' => 'e.g., 500ml, 16oz',
            ],
            [
                'key'   => 'field_size',
                'label' => 'Size (H x D)',
                'name'  => 'size',
                'type'  => 'text',
                'instructions' => 'e.g., 22.5cm x 7.2cm',
            ],
            [
                'key'   => 'field_weight',
                'label' => 'Weight',
                'name'  => 'weight',
                'type'  => 'text',
                'instructions' => 'e.g., 380g',
            ],
            [
                'key'   => 'field_mouth_type',
                'label' => 'Mouth / Neck Type',
                'name'  => 'mouth_type',
                'type'  => 'text',
                'instructions' => 'e.g., 28mm screw neck, cork finish',
            ],
            [
                'key'   => 'field_closure',
                'label' => 'Closure / Cap',
                'name'  => 'closure',
                'type'  => 'text',
                'instructions' => 'e.g., Screw cap, swing top, cork',
            ],
            [
                'key'   => 'field_moq',
                'label' => 'MOQ',
                'name'  => 'moq',
                'type'  => 'text',
                'instructions' => 'e.g., 5,000 pcs',
            ],
            [
                'key'   => 'field_lead_time',
                'label' => 'Lead Time',
                'name'  => 'lead_time',
                'type'  => 'text',
                'instructions' => 'e.g., 15-25 days',
            ],
            [
                'key'   => 'field_customizable',
                'label' => 'Customizable',
                'name'  => 'customizable',
                'type'  => 'true_false',
                'ui'    => 1,
                'default_value' => 1,
            ],
            [
                'key'   => 'field_packaging',
                'label' => 'Packaging Info',
                'name'  => 'packaging',
                'type'  => 'wysiwyg',
                'instructions' => 'Packaging details: carton size, pieces per carton, pallet info',
            ],
        ],
        'location' => [
            [
                [
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'product',
                ],
            ],
        ],
        'show_in_rest' => true,
    ]);
}

// Expose ACF fields in REST API (progressive enhancement if plugin not active)
add_action('rest_api_init', function () {
    register_rest_field('product', 'product_meta', [
        'get_callback' => function ($post) {
            $fields = ['sku', 'material', 'capacity', 'size', 'weight', 'mouth_type',
                       'closure', 'moq', 'lead_time', 'customizable', 'packaging'];
            $meta = [];
            foreach ($fields as $f) {
                $meta[$f] = get_post_meta($post['id'], $f, true);
            }
            return $meta;
        },
        'schema' => ['type' => 'object'],
    ]);
});
