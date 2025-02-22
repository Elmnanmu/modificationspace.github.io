// 为导航链接添加点击事件
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // 阻止默认跳转
        alert('你点击了：' + link.textContent);
    });
});
