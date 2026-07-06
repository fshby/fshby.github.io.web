function copyLink(button) {
    const card = button.closest('.download-card');
    if (card) {
        const url = card.getAttribute('data-url');
        if (url) {
            navigator.clipboard.writeText(url).then(() => {
                showToast();
            }).catch(err => {
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast();
            });
        }
    }
}

function showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.download-card, .plugin-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    const downloadButtons = document.querySelectorAll('.btn-download, .link-btn.download');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const link = btn.getAttribute('href');
            if (link && link.includes('baidu.com')) {
                const pwd = link.match(/pwd=(\d+)/);
                if (pwd) {
                    navigator.clipboard.writeText(pwd[1]).then(() => {
                        showToastWithMessage('提取码已复制: ' + pwd[1]);
                    });
                }
            }
        });
    });
});

function showToastWithMessage(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.innerHTML = `<i class="fas fa-info-circle"></i><span>${message}</span>`;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            toast.innerHTML = '<i class="fas fa-check-circle"></i><span>链接已复制到剪贴板</span>';
        }, 2000);
    }
}