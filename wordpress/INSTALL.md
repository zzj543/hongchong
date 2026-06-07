# WordPress 安装指南

## 1. 安装插件（WP Admin → Plugins → Add New）

搜索并安装这 5 个插件：

- [ ] **Advanced Custom Fields (ACF)** — 自定义字段
- [ ] **ACF to REST API** — 把 ACF 字段暴露给 REST API
- [ ] **Custom Post Type UI** — 可视化创建 CPT（或直接用主题代码）
- [ ] **Yoast SEO** — SEO meta
- [ ] **WP REST Cache** — 缓存 REST API 响应

## 2. 上传主题

将 `theme/` 文件夹上传到：
```
/wp-content/themes/hongchong-theme/
```

然后 WP Admin → Appearance → Themes → 激活 "HongChong Glass Headless"

## 3. 配置 SMTP

编辑 `/wp-content/themes/hongchong-theme/inc/email.php`：
- 把 `inquiry@hongchongglass.com` 改为你的真实邮箱
- 把 `YOUR_SMTP_PASSWORD` 改为 SMTP 密码

## 4. 创建产品分类

WP Admin → Products → Product Categories → 添加：

一级分类：
- Glass Bottles (slug: glass-bottles)
- Glass Jars (slug: glass-jars)
- Glass Vases (slug: glass-vases)

二级分类（示例）：
- Beverage Bottles (parent: Glass Bottles)
- Milk Bottles (parent: Glass Bottles)
- Mason Jars (parent: Glass Jars)
- Candle Jars (parent: Glass Jars)
- ...

## 5. 添加产品

WP Admin → Products → Add New
- Title: 产品名称（英文）
- Content: 产品详细描述
- Featured Image: 产品主图
- Product Category: 选择分类
- 填写 ACF 字段：SKU、Material、Capacity、Size、MOQ 等

## 6. 验证 API

浏览器访问：
```
http://212.129.239.58/wp-json/wp/v2/products
http://212.129.239.58/wp-json/wp/v2/product-categories
```

应该能看到 JSON 数据。
