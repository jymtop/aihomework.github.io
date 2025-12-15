// JavaScript交互逻辑
document.querySelectorAll('.category-title').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const submenu = this.nextElementSibling;
        if(submenu && submenu.classList.contains('submenu')) {
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            this.querySelector('.category-arrow').style.transform = 
                submenu.style.display === 'block' ? 'rotate(-135deg)' : 'rotate(45deg)';
        }
    });
});

// 点击页面其他区域关闭菜单
document.addEventListener('click', function(e) {
    if(!e.target.closest('.category-item')) {
        document.querySelectorAll('.submenu').forEach(sub => {
            sub.style.display = 'none';
        });
        document.querySelectorAll('.category-arrow').forEach(arrow => {
            arrow.style.transform = 'rotate(45deg)';
        });
    }
});

