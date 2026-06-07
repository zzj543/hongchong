<?php
/**
 * Email Notifications for Inquiries
 */

// SMTP configuration for Tencent Enterprise Email
add_action('phpmailer_init', function ($phpmailer) {
    $phpmailer->isSMTP();
    $phpmailer->Host       = 'smtp.exmail.qq.com';
    $phpmailer->SMTPAuth   = true;
    $phpmailer->Port       = 465;
    $phpmailer->SMTPSecure = 'ssl';
    $phpmailer->Username   = 'inquiry@hongchongglass.com';   // ← Change this
    $phpmailer->Password   = 'YOUR_SMTP_PASSWORD';            // ← Change this
    $phpmailer->From       = 'inquiry@hongchongglass.com';
    $phpmailer->FromName   = 'HongChong Glass';
});

/**
 * Send notification to sales team
 */
function send_inquiry_notification($post_id, $data) {
    $to = get_option('admin_email');
    $subject = "New Inquiry: {$data['company']} — {$data['country']}";

    $body  = "=== New Inquiry Received ===\n\n";
    $body .= "Name: {$data['name']}\n";
    $body .= "Company: {$data['company']}\n";
    $body .= "Email: {$data['email']}\n";
    $body .= "Phone/WhatsApp: " . ($data['phone'] ?? 'N/A') . "\n";
    $body .= "Country: {$data['country']}\n";
    $body .= "Products: " . ($data['products'] ?? 'N/A') . "\n";
    $body .= "Quantity: " . ($data['quantity'] ?? 'N/A') . "\n";
    $body .= "Target Market: " . ($data['target_market'] ?? 'N/A') . "\n";
    $body .= "Custom Requirements: " . ($data['custom_requirements'] ?? 'N/A') . "\n";
    $body .= "\n--- Message ---\n";
    $body .= ($data['message'] ?? '') . "\n";
    $body .= "\n---\n";
    $body .= "Source: " . ($data['source_url'] ?? 'N/A') . "\n";
    $body .= "View in admin: " . admin_url("post.php?post={$post_id}&action=edit") . "\n";

    wp_mail($to, $subject, $body, ['Content-Type: text/plain; charset=UTF-8']);
}

/**
 * Send auto-reply to customer
 */
function send_inquiry_autoreply($data) {
    $subject = "Thank you for your inquiry — HongChong Glass";

    $body  = "Dear {$data['name']},\n\n";
    $body .= "Thank you for contacting HongChong Glass.\n\n";
    $body .= "We have received your inquiry regarding:\n";
    $body .= ($data['products'] ?? 'Glass containers') . "\n\n";
    $body .= "Our team will review your requirements and reply within 24 business hours.\n\n";
    $body .= "About HongChong Glass:\n";
    $body .= "We are a professional glass container sourcing company located in\n";
    $body .= "Tongshan Glass Industrial Park, Xuzhou, Jiangsu, China — one of\n";
    $body .= "China's largest glass manufacturing clusters.\n\n";
    $body .= "Our advantages:\n";
    $body .= "• Multi-factory access — wider product range\n";
    $body .= "• Flexible MOQ — we combine orders across clients\n";
    $body .= "• Strict QC — three-stage quality inspection\n";
    $body .= "• One-stop service — product + decoration + packaging + shipping\n\n";
    $body .= "For urgent matters:\n";
    $body .= "• Email: sales@hongchongglass.com\n";
    $body .= "• Phone/WhatsApp: +86-XXX-XXXX-XXXX\n\n";
    $body .= "Best regards,\n";
    $body .= "HongChong Glass Team\n";
    $body .= "Xuzhou HongChong International Trading Co., Ltd.\n";
    $body .= "Tongshan Glass Industrial Park, Xuzhou, Jiangsu, China\n";

    wp_mail($data['email'], $subject, $body, ['Content-Type: text/plain; charset=UTF-8']);
}
