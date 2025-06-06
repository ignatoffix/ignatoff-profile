document.addEventListener('DOMContentLoaded', function() {
    // Элементы модальных окон
    const aboutBtn = document.getElementById('descriptionBtn');
    const contactBtn = document.getElementById('contactBtn');
    const aboutModal = document.getElementById('aboutModal');
    const contactModal = document.getElementById('contactModal');
    const closeAboutModal = document.getElementById('closeAboutModal');
    const closeContactModal = document.getElementById('closeContactModal');
    
    // Анимация счетчиков статистики
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 60;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 30);
        });
    }
    
    // Анимация прогресс-баров навыков
    function animateSkillBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            }, index * 200);
        });
    }
    
    // Запуск анимаций после загрузки
    setTimeout(() => {
        animateCounters();
        animateSkillBars();
    }, 800);
    
    // Открытие модального окна "О себе"
    aboutBtn.addEventListener('click', function() {
        aboutModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Анимация появления элементов модального окна
        const aboutItems = document.querySelectorAll('.about-item');
        aboutItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
    
    // Открытие модального окна "Контакты"
    contactBtn.addEventListener('click', function() {
        contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Анимация появления контактов
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    });
    
    // Закрытие модальных окон
    closeAboutModal.addEventListener('click', () => closeModal(aboutModal));
    closeContactModal.addEventListener('click', () => closeModal(contactModal));
    
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Закрытие модальных окон по клику вне их
    window.addEventListener('click', function(event) {
        if (event.target === aboutModal) {
            closeModal(aboutModal);
        }
        if (event.target === contactModal) {
            closeModal(contactModal);
        }
    });
    
    // Копирование контактной информации при клике
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const contactValue = this.querySelector('.contact-value').textContent;
            navigator.clipboard.writeText(contactValue).then(() => {
                // Показать уведомление о копировании
                showNotification('Скопировано в буфер обмена!');
            });
        });
    });
    
    // Функция показа уведомлений
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #4ade80, #22c55e);
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 600;
            box-shadow: 0 10px 25px rgba(74, 222, 128, 0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }
    
    // Добавляем CSS для анимаций уведомлений
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Эффект параллакса для карточки профиля
    const profileCard = document.querySelector('.profile-card');
    let isHovering = false;
    
    profileCard.addEventListener('mouseenter', () => {
        isHovering = true;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        isHovering = false;
        profileCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isHovering) return;
        
        const rect = profileCard.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = (mouseY / rect.height) * -10;
        const rotateY = (mouseX / rect.width) * 10;
        
        profileCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    // Анимация частиц для кнопки
    function createButtonParticles(button) {
        const particles = button.querySelector('.btn-particles');
        if (!particles) return;
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat 1s ease-out forwards;
            `;
            
            const angle = (i / 6) * Math.PI * 2;
            const distance = 30 + Math.random() * 20;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.setProperty('--x', x + 'px');
            particle.style.setProperty('--y', y + 'px');
            
            particles.appendChild(particle);
            
            setTimeout(() => {
                if (particles.contains(particle)) {
                    particles.removeChild(particle);
                }
            }, 1000);
        }
    }
    
    // Добавляем CSS для анимации частиц
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(0);
                opacity: 0;
            }
        }
        
        .btn-particles {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            border-radius: 16px;
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Добавляем частицы к кнопке при клике
    aboutBtn.addEventListener('click', function() {
        createButtonParticles(this);
    });
    
    // Добавляем эффект печатной машинки для заголовков
    function typeWriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
    
    // Запускаем эффект печатной машинки для ника
    setTimeout(() => {
        const nicknameElement = document.querySelector('.nickname .text-reveal');
        if (nicknameElement) {
            typeWriter(nicknameElement, 'ignatoff', 150);
        }
    }, 1200);
    
    // Добавляем звуковые эффекты (без реального звука, только визуальные индикаторы)
    function addSoundEffect(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 100);
    }
    
    // Применяем звуковые эффекты к интерактивным элементам
    document.querySelectorAll('button, .skill-icon, .social-link').forEach(element => {
        element.addEventListener('click', function() {
            addSoundEffect(this);
        });
    });
    
    // Создание дополнительных плавающих элементов
    function createFloatingElement() {
        const symbols = ['⚡', '💫', '🔮', '✨', '🌟'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        const element = document.createElement('div');
        element.textContent = symbol;
        element.style.cssText = `
            position: fixed;
            font-size: 20px;
            opacity: 0.6;
            pointer-events: none;
            z-index: 0;
            animation: magicFloat 4s ease-out forwards;
        `;
        
        element.style.left = Math.random() * window.innerWidth + 'px';
        element.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(element);
        
        setTimeout(() => {
            if (document.body.contains(element)) {
                document.body.removeChild(element);
            }
        }, 4000);
    }
    
    // Добавляем CSS для магических элементов
    const magicStyle = document.createElement('style');
    magicStyle.textContent = `
        @keyframes magicFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.6;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(magicStyle);
    
    // Создаем магические элементы каждые 3 секунды
    setInterval(createFloatingElement, 3000);
    
    // Добавляем эффект свечения при скролле (для мобильных устройств)
    let ticking = false;
    
    function updateGlow() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        profileCard.style.filter = `brightness(${1 + scrolled * 0.001}) contrast(${1 + scrolled * 0.0005})`;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateGlow);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
});