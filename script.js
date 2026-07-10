const config = window.siteConfig || {};
const state = {
    category: 'all',
    query: ''
};

const categoryMap = new Map((config.categories || []).map((item) => [item.id, item.name]));

document.addEventListener('DOMContentLoaded', () => {
    renderSiteInfo();
    renderCategories();
    bindSearch();
    renderResources();
    renderNotice();
});

function renderSiteInfo() {
    const site = config.site || {};
    setText('site-eyebrow', site.eyebrow);
    setText('site-title', site.title);
    setText('site-description', site.description);
    setText('footer-brand', site.brand);
    setText('footer-text', site.footerText);
    document.title = `${site.title || '资源下载'} - ${site.brand || '技术小站'}`;

    const meta = document.getElementById('site-meta');
    if (!meta) return;

    const total = (config.resources || []).length;
    meta.innerHTML = [
        createMetaItem('资源数量', `${total} 项`),
        createMetaItem('最后更新', site.updatedAt || '未设置'),
        createMetaItem('维护方式', '配置文件')
    ].join('');
}

function createMetaItem(label, value) {
    return `<div class="meta-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function renderCategories() {
    const tabs = document.getElementById('category-tabs');
    if (!tabs) return;

    tabs.innerHTML = (config.categories || [])
        .map((category) => {
            const active = category.id === state.category ? ' active' : '';
            return `<button class="filter-tab${active}" type="button" data-category="${escapeHtml(category.id)}">${escapeHtml(category.name)}</button>`;
        })
        .join('');

    tabs.addEventListener('click', (event) => {
        const button = event.target.closest('[data-category]');
        if (!button) return;
        state.category = button.dataset.category;
        renderCategories();
        renderResources();
    });
}

function bindSearch() {
    const search = document.getElementById('resource-search');
    if (!search) return;

    search.addEventListener('input', (event) => {
        state.query = event.target.value.trim().toLowerCase();
        renderResources();
    });
}

function renderResources() {
    const list = document.getElementById('resource-list');
    const count = document.getElementById('result-count');
    const empty = document.getElementById('empty-state');
    if (!list) return;

    const resources = getFilteredResources();
    list.innerHTML = resources.map(createResourceCard).join('');

    if (count) {
        count.textContent = `共 ${resources.length} 项`;
    }

    if (empty) {
        empty.hidden = resources.length > 0;
    }
}

function getFilteredResources() {
    return (config.resources || []).filter((resource) => {
        const matchesCategory = state.category === 'all' || resource.category === state.category;
        const searchable = [
            resource.title,
            resource.description,
            resource.category,
            ...(resource.tags || [])
        ].join(' ').toLowerCase();
        return matchesCategory && (!state.query || searchable.includes(state.query));
    });
}

function createResourceCard(resource) {
    const tags = (resource.tags || [])
        .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
        .join('');
    const category = categoryMap.get(resource.category) || resource.category || '资源';
    const githubLink = resource.github
        ? `<a class="ghost-link" href="${escapeAttribute(resource.github)}" target="_blank" rel="noopener">GitHub</a>`
        : '';
    const code = resource.extractCode
        ? `<span class="extract-code">提取码 ${escapeHtml(resource.extractCode)}</span>`
        : '';

    return `
        <article class="resource-card">
            <div class="resource-main">
                <div class="resource-topline">
                    <span class="category-label">${escapeHtml(category)}</span>
                    ${code}
                </div>
                <h3>${escapeHtml(resource.title)}</h3>
                <p>${escapeHtml(resource.description || '')}</p>
                <div class="tag-row">${tags}</div>
            </div>
            <div class="resource-actions">
                ${githubLink}
                <button class="ghost-link" type="button" onclick="copyText('${escapeJs(resource.url)}', '链接已复制到剪贴板')">复制链接</button>
                <a class="primary-link" href="${escapeAttribute(resource.url)}" target="_blank" rel="noopener" onclick="handleDownloadClick(event, '${escapeJs(resource.extractCode || '')}')">下载</a>
            </div>
        </article>
    `;
}

function renderNotice() {
    const notice = config.notice || {};
    const section = document.getElementById('notice-section');
    if (!section || !notice.enabled) return;

    section.hidden = false;
    setText('notice-title', notice.title);
    setText('notice-description', notice.description);

    const imageWrap = document.getElementById('notice-image-wrap');
    const image = document.getElementById('notice-image');
    if (notice.image && imageWrap && image) {
        imageWrap.hidden = false;
        image.src = notice.image;
        image.alt = notice.imageAlt || notice.title || '';
        setText('notice-image-label', notice.imageLabel);
    }
}

function handleDownloadClick(event, extractCode) {
    if (!extractCode) return;
    copyText(extractCode, `提取码已复制：${extractCode}`);
}

function copyText(text, message) {
    if (!text) return;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => showToast(message)).catch(() => fallbackCopy(text, message));
        return;
    }

    fallbackCopy(text, message);
}

function fallbackCopy(text, message) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast(message);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element && value) {
        element.textContent = value;
    }
}

function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function escapeAttribute(value) {
    return escapeHtml(value);
}

function escapeJs(value) {
    return String(value ?? '')
        .replaceAll('\\', '\\\\')
        .replaceAll("'", "\\'")
        .replaceAll('\n', '\\n')
        .replaceAll('\r', '');
}
