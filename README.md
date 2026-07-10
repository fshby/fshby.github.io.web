# 技术资源下载合集

这是一个纯静态网页项目，用于展示和分发常用技术资源、Codex/Claude 相关工具以及插件下载链接。项目不依赖构建工具，直接打开 `index.html` 即可运行。

## 项目结构

```text
.
├── index.html      # 页面结构容器
├── config.js       # 站点信息、分类、下载项配置
├── style.css       # 页面样式、暗色主题、响应式布局
├── script.js       # 配置渲染、搜索筛选、复制提示等交互逻辑
├── myname.png      # 页面中使用的二维码图片
└── .github/        # GitHub 配置目录
```

## 页面内容

当前页面主要包含以下模块：

- 资源下载：NodeJS、Codex++、CC-Switch、Git、Codex 汉化插件、ClaudeCode 相关安装包等。
- 插件推荐：codex-helper、codex-zh-CN、Claude-Code-helper、claude-code-desktop-offline。
- 特殊资源：科学上网相关入口和二维码图片。

## 本地预览

本项目是静态站点，可以直接用浏览器打开：

```text
index.html
```

如果希望通过本地 HTTP 服务预览，也可以在项目根目录执行：

```bash
python -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

## 维护说明

### 修改下载资源

下载资源主要维护在 `config.js` 的 `resources` 数组中：

- `title`：资源名称。
- `description`：资源说明。
- `category`：资源分类，对应 `categories` 中的 `id`。
- `tags`：资源标签，会展示在资源卡片底部，也会参与搜索。
- `url`：下载按钮跳转链接，也是复制链接使用的地址。
- `extractCode`：可选，百度网盘等资源的提取码。
- `github`：可选，相关 GitHub 仓库链接。

新增资源时，复制现有资源对象并替换对应字段即可，不需要修改 `index.html`。

### 修改分类

分类维护在 `config.js` 的 `categories` 数组中。每个分类包含：

- `id`：分类唯一标识。
- `name`：页面上展示的分类名称。

保留 `all` 分类可以展示全部资源。

### 修改样式

页面样式集中在 `style.css`：

- `:root` 中维护主题色、背景色、文字色等变量。
- `.download-card` 控制资源卡片样式。
- `.plugin-card` 控制插件卡片样式。
- 底部 `@media` 规则控制移动端适配。

### 修改交互

交互逻辑集中在 `script.js`：

- `copyLink(button)`：复制资源卡片中的链接。
- `showToast()`：展示默认复制成功提示。
- `showToastWithMessage(message)`：展示自定义提示信息。

## 外部依赖

页面通过 CDN 引入以下前端资源：

- Google Fonts：`Inter`
- Font Awesome：图标库

这些资源需要网络可访问。如果离线部署，可以考虑将字体和图标资源下载到本地并改成本地引用。

## 已知问题

项目文件建议统一使用 UTF-8 编码，避免中文内容在不同终端或编辑器中显示异常。
