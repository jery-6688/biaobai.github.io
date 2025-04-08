// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const acceptBtn = document.getElementById('accept-btn');
    const maybeBtn = document.getElementById('maybe-btn');
    const successModal = document.getElementById('success-modal');
    const maybeModal = document.getElementById('maybe-modal');
    const closeModal = document.getElementById('close-modal');
    const closeMaybeModal = document.getElementById('close-maybe-modal');
    const floatingHearts = document.getElementById('floating-hearts');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const musicOn = document.querySelector('.music-on');
    const musicOff = document.querySelector('.music-off');
    
    // 初始化音乐状态
    let isMusicPlaying = false;
    
    // 创建漂浮爱心
    function createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 3 + 's';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            
            floatingHearts.appendChild(heart);
            
            // 动画结束后移除爱心
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, 300);
    }
    
    // 创建烟花效果
    function createFireworks() {
        const fireworks = document.querySelector('.fireworks');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '5px';
            particle.style.height = '5px';
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = getRandomColor();
            particle.style.left = '50%';
            particle.style.top = '50%';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const duration = Math.random() * 1 + 1;
            
            particle.style.transform = `translate(-50%, -50%)`;
            particle.style.animation = `firework ${duration}s forwards`;
            particle.style.animationTimingFunction = 'ease-out';
            
            // 添加关键帧动画
            const keyframes = `
                @keyframes firework {
                    to {
                        transform: translate(
                            calc(-50% + ${Math.cos(angle) * distance}px),
                            calc(-50% + ${Math.sin(angle) * distance}px)
                        );
                        opacity: 0;
                    }
                }
            `;
            
            const style = document.createElement('style');
            style.innerHTML = keyframes;
            document.head.appendChild(style);
            
            fireworks.appendChild(particle);
        }
    }
    
    // 获取随机颜色
    function getRandomColor() {
        const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // 接受按钮点击事件
    acceptBtn.addEventListener('click', function() {
        successModal.style.display = 'flex';
        createFireworks();
        playMusic();
    });
    
    // 考虑按钮点击事件
    maybeBtn.addEventListener('click', function() {
        maybeModal.style.display = 'flex';
    });
    
    // 关闭成功模态框
    closeModal.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    // 关闭考虑模态框
    closeMaybeModal.addEventListener('click', function() {
        maybeModal.style.display = 'none';
    });
    
    // 点击模态框背景关闭
    window.addEventListener('click', function(event) {
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
        if (event.target === maybeModal) {
            maybeModal.style.display = 'none';
        }
    });
    
    // 音乐控制
    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicOn.style.opacity = '0';
            musicOff.style.opacity = '1';
        } else {
            bgMusic.play().catch(e => {
                console.log('自动播放被阻止，需要用户交互才能播放音乐');
            });
            musicOn.style.opacity = '1';
            musicOff.style.opacity = '0';
        }
        isMusicPlaying = !isMusicPlaying;
    }
    
    function playMusic() {
        if (!isMusicPlaying) {
            bgMusic.play().catch(e => {
                console.log('自动播放被阻止，需要用户交互才能播放音乐');
            });
            musicOn.style.opacity = '1';
            musicOff.style.opacity = '0';
            isMusicPlaying = true;
        }
    }
    
    musicToggle.addEventListener('click', toggleMusic);
    
    // 添加移动端触摸事件
    acceptBtn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    acceptBtn.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
    
    maybeBtn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    maybeBtn.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
    
    // 初始化漂浮爱心
    createFloatingHearts();
    
    // 添加按钮悬停效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 添加打字机效果
    function typeWriter(element, text, speed = 50, index = 0) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(() => typeWriter(element, text, speed, index), speed);
        }
    }
    
    // 页面加载完成后的额外效果
    window.addEventListener('load', function() {
        // 添加一些额外的动画或效果
        document.querySelector('.love-card').classList.add('animate__animated', 'animate__fadeIn');
        
        // 尝试预加载图片
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const preloadImg = new Image();
                preloadImg.src = src;
            }
        });
    });
    
    // 禁用右键菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        // ESC键关闭模态框
        if (e.key === 'Escape') {
            successModal.style.display = 'none';
            maybeModal.style.display = 'none';
        }
        
        // 空格键播放/暂停音乐
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            toggleMusic();
        }
    });
});