// 切换分类展开/收起
function toggleCategory(button, categoryId) {
    const subcategoryContainer = document.getElementById(categoryId);
    const arrow = button.querySelector('.arrow');
    
    // 切换展开/收起状态
    subcategoryContainer.classList.toggle('expanded');
    arrow.classList.toggle('expanded');
    button.classList.toggle('active');
    
    // 添加点击动画效果
    button.style.transform = 'scale(0.98)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    // 子项动画效果
    const subcategories = subcategoryContainer.querySelectorAll('.subcategory');
    if (subcategoryContainer.classList.contains('expanded')) {
        subcategories.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }
}

// 处理子分类点击
function handleClick(element, caseId) {
    // 创建闪光效果
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 215, 0, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // 显示提示信息
    const caseName = element.querySelector('.subcategory-title').textContent;
    showNotification(`正在加载 ${caseName} 的剧情...`);
    
    // 阻止默认跳转
    return false;
}

// 处理视频链接点击
function openVideo(url) {
    showNotification('正在打开B站视频...<span class="loading"></span>');
    
    // 延迟后打开视频
    setTimeout(() => {
        window.open(url, '_blank');
    }, 1000);
    
    return false;
}

// 显示通知
function showNotification(message) {
    const notification = document.createElement('div');
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(30, 60, 114, 0.9);
        backdrop-filter: blur(10px);
        color: #ffd700;
        padding: 15px 30px;
        border-radius: 10px;
        font-size: 16px;
        z-index: 1000;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 215, 0, 0.3);
        text-align: center;
        max-width: 80%;
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // 淡入
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // 3秒后淡出
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    const sections = document.querySelectorAll('.category-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // ESC键关闭所有展开的菜单
        const expandedContainers = document.querySelectorAll('.subcategory-container.expanded');
        expandedContainers.forEach(container => {
            const button = container.previousElementSibling;
            const arrow = button.querySelector('.arrow');
            container.classList.remove('expanded');
            arrow.classList.remove('expanded');
            button.classList.remove('active');
        });
    }
});
