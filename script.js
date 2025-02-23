// ======== 平滑滚动核心函数 ========
const smoothScroll = (target, duration = 800) => {
    const targetPos = typeof target === 'number' 
      ? target 
      : target.getBoundingClientRect().top + window.pageYOffset;
    
    const startPos = window.pageYOffset;
    const distance = targetPos - startPos;
    let startTime = null;
  
    const animation = currentTime => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPos, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
  
    const easeInOutQuad = (t, b, c, d) => {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };
  
    requestAnimationFrame(animation);
  };
  
  // ======== 事件绑定 ========
  // 1. 拦截所有锚点点击
  document.addEventListener('click', e => {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) smoothScroll(target);
    }
  });
  
  // 2. 监听键盘导航
  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentPos = window.pageYOffset;
      const delta = e.key === 'ArrowDown' ? window.innerHeight : -window.innerHeight;
      smoothScroll(currentPos + delta);
    }
  });
  
  // 3. 优化鼠标滚轮
  let isScrolling = false;
  window.addEventListener('wheel', e => {
    if (!isScrolling) {
      isScrolling = true;
      const delta = e.deltaY > 0 ? window.innerHeight : -window.innerHeight;
      smoothScroll(window.pageYOffset + delta);
      setTimeout(() => isScrolling = false, 800);
    }
  }, { passive: true });
  
  // 4. 移动端触摸优化
  let touchStartY = 0;
  window.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  
  window.addEventListener('touchend', e => {
    const touchEndY = e.changedTouches[0].clientY;
    const delta = touchStartY - touchEndY;
    if (Math.abs(delta) > 50) {
      smoothScroll(window.pageYOffset + (delta > 0 ? -window.innerHeight : window.innerHeight));
    }
  }, { passive: true });
  



  // 修改折叠面板交互逻辑
document.querySelectorAll('.rule-header').forEach(header => {
    header.addEventListener('click', () => {
      const section = header.parentElement;
      const content = section.querySelector('.rule-content');
      
      if (section.classList.contains('active')) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
      
      section.classList.toggle('active');
    });
  });
  
