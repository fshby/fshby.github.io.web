window.siteConfig = {
    site: {
        title: '技术资源下载合集',
        brand: '浮生技术小站',
        eyebrow: 'Resource Hub',
        description: '常用工具、插件和安装包的统一下载入口，清晰分类，按需获取。',
        updatedAt: '2026/7/1',
        footerText: '专注于高质量原创项目分享'
    },
    categories: [
        { id: 'all', name: '全部' },
        { id: 'tool', name: '工具下载' },
        { id: 'plugin', name: '原创插件' },
        { id: 'offline', name: '离线安装包' }
    ],
    resources: [
        {
            title: 'NodeJS',
            description: 'JavaScript 运行时环境。',
            category: 'tool',
            tags: ['运行环境', 'JavaScript'],
            url: 'https://www.codenice.cn/api/drive/public/FD2pdszf'
        },
        {
            title: 'Codex++',
            description: 'AI 编程助手增强版。',
            category: 'tool',
            tags: ['Codex', 'AI 编程'],
            url: 'https://www.codenice.cn/api/drive/public/b4WgLYpT'
        },
        {
            title: 'CC-Switch',
            description: '代码切换工具。',
            category: 'tool',
            tags: ['切换工具'],
            url: 'https://www.codenice.cn/api/drive/public/quqhceno'
        },
        {
            title: 'Git',
            description: '常用版本控制工具。',
            category: 'tool',
            tags: ['版本控制'],
            url: 'https://www.codenice.cn/api/drive/public/wYQ2kISv'
        },
        {
            title: 'Codex 离线安装包',
            description: '百度网盘资源，提取码 9999。',
            category: 'offline',
            tags: ['Codex', '百度网盘'],
            url: 'https://pan.baidu.com/s/1t68i4DFki9WOx1Ylj-jv5Q?pwd=9999',
            extractCode: '9999'
        },
        {
            title: 'Codex 汉化插件',
            description: 'Codex 中文版汉化包 v5.5.5。',
            category: 'plugin',
            tags: ['Codex', '汉化'],
            url: 'https://github.com/fshby/fshby.codex-zh-CN/raw/refs/heads/main/codex-zh-CN-v5.5.5.zip',
            github: 'https://github.com/fshby/fshby.codex-zh-CN.git'
        },
        {
            title: 'codex-helper',
            description: 'Codex 桌面版集成 DeepSeek。',
            category: 'plugin',
            tags: ['Codex', 'DeepSeek'],
            url: 'https://www.codenice.cn/api/drive/public/wVeYRiZw',
            github: 'https://github.com/xqnode/codex-helper'
        },
        {
            title: 'ClaudeCode 桌面版下载器',
            description: 'ClaudeCode 桌面版一键下载安装。',
            category: 'tool',
            tags: ['ClaudeCode', '下载器'],
            url: 'https://www.codenice.cn/api/drive/public/aIJi6kKT'
        },
        {
            title: 'ClaudeCode 离线安装包',
            description: '百度网盘资源，提取码 9999。',
            category: 'offline',
            tags: ['ClaudeCode', '百度网盘'],
            url: 'https://pan.baidu.com/s/1GIbAaIQYy2nyGI_ikyAjUw?pwd=9999',
            extractCode: '9999',
            github: 'https://github.com/xqnode/claude-code-desktop-offline'
        },
        {
            title: 'Claude-Code-helper',
            description: 'ClaudeCode 集成 DeepSeek。',
            category: 'plugin',
            tags: ['ClaudeCode', 'DeepSeek'],
            url: 'https://www.codenice.cn/api/drive/public/tYqq97Y5',
            github: 'https://github.com/xqnode/claude-code-helper'
        }
    ],
    notice: {
        enabled: true,
        title: '科学上网',
        description: '群主提供视频教程和文档，有需要可以付费获取，也可以协助首次开通。每月 2 元享受高速节点，直接联系群主即可。',
        image: 'myname.png',
        imageAlt: '群主微信二维码',
        imageLabel: '扫码添加群主微信'
    }
};
