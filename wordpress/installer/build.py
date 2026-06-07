import base64, os

THEME_DIR = r"D:\github\hongchong\wordpress\theme"
OUTPUT = r"D:\github\hongchong\wordpress\installer\hongchong-installer.php"

files = {}
for root, dirs, filenames in os.walk(THEME_DIR):
    for fname in filenames:
        path = os.path.join(root, fname)
        relpath = os.path.relpath(path, THEME_DIR).replace("\\", "/")
        with open(path, "rb") as f:
            files[relpath] = base64.b64encode(f.read()).decode()

php = ['<?php']
php.append('/* Plugin Name: HongChong Theme Installer */')
php.append('register_activation_hook(__FILE__, function() {')
php.append('  $dir = WP_CONTENT_DIR . "/themes/hongchong-theme";')
php.append('  if (!is_dir($dir)) mkdir($dir, 0755, true);')
php.append('  if (!is_dir($dir."/inc")) mkdir($dir."/inc", 0755, true);')

for relpath, content in files.items():
    php.append(f'  file_put_contents("$dir/{relpath}", base64_decode("{content}"));')

php.append('  switch_theme("hongchong-theme");')
php.append('  if (!term_exists("glass-bottles", "product_category")) {')
php.append('    wp_insert_term("Glass Bottles", "product_category", ["slug"=>"glass-bottles"]);')
php.append('    wp_insert_term("Glass Jars", "product_category", ["slug"=>"glass-jars"]);')
php.append('    wp_insert_term("Glass Vases", "product_category", ["slug"=>"glass-vases"]);')
php.append('  }')
php.append('  deactivate_plugins(plugin_basename(__FILE__));')
php.append('});')

with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write("\n".join(php))

total_size = sum(len(c) for c in files.values())
print(f"Installer created: {OUTPUT}")
print(f"Files: {len(files)}, Base64 data: {total_size:,} chars")
