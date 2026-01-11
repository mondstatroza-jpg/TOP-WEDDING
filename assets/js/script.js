'use strict';

// Основная инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function () {
    console.log('TOP-WEDDING - сайт загружен');

    // Инициализация всех компонентов
    initCarousel();
    initMobileMenu();
    initModals();
    initForm();
    initVideo();
    initScrollAnimations();
    updateFooterYear();
    initSmoothScroll();
});

/**
 * Карусель баннеров
 */
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!slides.length) return;

    let currentSlide = 0;
    let slideInterval;

    // Показать конкретный слайд
    function showSlide(index) {
        // Проверка границ
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Скрыть все слайды
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Скрыть все точки
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Показать текущий слайд и точку
        slides[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        currentSlide = index;
    }

    // Следующий слайд
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Предыдущий слайд
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Автопереключение
    function startAutoSlide() {
        stopAutoSlide();
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Остановка автопереключения
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Обработчики событий
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showSlide(index);
        });
    });

    // Автопереключение при наведении
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // Запуск
    startAutoSlide();
}

/**
 * Мобильное меню
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    if (!mobileMenuBtn || !navList) return;

    mobileMenuBtn.addEventListener('click', function () {
        navList.classList.toggle('active');

        // Меняем иконку
        const icon = this.querySelector('i');
        if (icon) {
            icon.className = navList.classList.contains('active')
                ? 'fas fa-times'
                : 'fas fa-bars';
        }
    });

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navList.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        });
    });

    // Закрытие при ресайзе окна
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            navList.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    });
}

/**
 * Модальные окна
 */
function initModals() {
    const modalOverlay = document.querySelector('.modal-overlay');
    const modals = document.querySelectorAll('.modal');
    const openModalButtons = document.querySelectorAll('.open-modal, .open-contact');
    const closeModalButtons = document.querySelectorAll('.modal-close');

    // Открытие модального окна
    openModalButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            const modalType = this.getAttribute('data-type');
            const planType = this.getAttribute('data-plan');

            // Закрыть все модальные окна
            closeAllModals();

            // Показать overlay
            if (modalOverlay) {
                modalOverlay.classList.add('active');
            }

            // Показать нужное модальное окно
            if (modalType === 'order' || modalType === 'discount') {
                const orderModal = document.getElementById('orderModal');
                if (orderModal) {
                    orderModal.classList.add('active');

                    // Установить тип тарифа
                    const planInput = document.getElementById('planType');
                    if (planInput) {
                        planInput.value = planType || 'Запрос на скидку';
                    }
                }
            } else {
                // Контакты
                const contactModal = document.getElementById('contactModal');
                if (contactModal) {
                    contactModal.classList.add('active');
                }
            }

            // Предотвращаем всплытие
            event.stopPropagation();
        });
    });

    // Закрытие модальных окон
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });

    // Закрытие по клику на overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeAllModals);
    }

    // Закрытие по клавише ESC
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });

    // Функция закрытия всех модальных окон
    function closeAllModals() {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });

        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    }
}

/**
 * Форма заявки
 */
function initForm() {
    const orderForm = document.getElementById('orderForm');
    if (!orderForm) return;

    orderForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Валидация формы
        if (!validateForm()) {
            return;
        }

        // Показываем индикатор загрузки
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        if (btnText && btnLoading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
        }
        submitBtn.disabled = true;

        // Собираем данные формы
        const formData = new FormData(this);

        // Добавляем дополнительные данные
        formData.append('timestamp', new Date().toISOString());
        formData.append('ip', await getClientIP());

        try {
            // Отправляем запрос на сервер
            const response = await fetch('assets/php/send-mail.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            // Показываем результат
            showFormMessage(result.success ? 'success' : 'error', result.message);

            if (result.success) {
                // Сбрасываем форму
                orderForm.reset();

                // Закрываем модальное окно через 3 секунды
                setTimeout(() => {
                    closeAllModals();
                }, 3000);
            }

        } catch (error) {
            console.error('Ошибка отправки формы:', error);
            showFormMessage('error', 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь по телефону.');
        } finally {
            // Восстанавливаем кнопку
            if (btnText && btnLoading) {
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
            }
            submitBtn.disabled = false;
        }
    });

    // Валидация формы
    function validateForm() {
        let isValid = true;
        clearErrors();

        const fields = {
            name: document.getElementById('name'),
            phone: document.getElementById('phone'),
            email: document.getElementById('email'),
            eventType: document.getElementById('eventType'),
            eventDate: document.getElementById('eventDate'),
            agree: document.getElementById('agree')
        };

        // Проверка имени
        if (!fields.name.value.trim()) {
            showError(fields.name, 'Введите ваше имя');
            isValid = false;
        } else if (fields.name.value.trim().length < 2) {
            showError(fields.name, 'Имя должно содержать минимум 2 символа');
            isValid = false;
        }

        // Проверка телефона
        if (!fields.phone.value.trim()) {
            showError(fields.phone, 'Введите ваш телефон');
            isValid = false;
        } else if (!isValidPhone(fields.phone.value)) {
            showError(fields.phone, 'Введите корректный номер телефона');
            isValid = false;
        }

        // Проверка email
        if (!fields.email.value.trim()) {
            showError(fields.email, 'Введите ваш email');
            isValid = false;
        } else if (!isValidEmail(fields.email.value)) {
            showError(fields.email, 'Введите корректный email');
            isValid = false;
        }

        // Проверка типа мероприятия
        if (!fields.eventType.value) {
            showError(fields.eventType, 'Выберите тип мероприятия');
            isValid = false;
        }

        // Проверка даты
        if (!fields.eventDate.value) {
            showError(fields.eventDate, 'Выберите дату мероприятия');
            isValid = false;
        } else {
            const selectedDate = new Date(fields.eventDate.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                showError(fields.eventDate, 'Дата не может быть в прошлом');
                isValid = false;
            }
        }

        // Проверка согласия
        if (!fields.agree.checked) {
            showError(fields.agree, 'Необходимо согласие на обработку данных');
            isValid = false;
        }

        return isValid;
    }

    // Валидация телефона
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,20}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }

    // Валидация email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function getClientIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch {
            return 'Неизвестно';
        }
    }

    // Показать ошибку
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;

        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.cssText = `
            color: #ff3860;
            font-size: 12px;
            margin-top: 5px;
            animation: fadeIn 0.3s ease;
        `;

        formGroup.appendChild(error);

        // Подсветка поля с ошибкой
        input.style.borderColor = '#ff3860';

        // Убираем ошибку при вводе
        input.addEventListener('input', function clearError() {
            this.style.borderColor = '#ddd';
            if (error.parentNode === formGroup) {
                formGroup.removeChild(error);
            }
            this.removeEventListener('input', clearError);
        }, { once: true });
    }

    // Очистка ошибок
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('.form-group input, .form-group select, .form-group textarea')
            .forEach(input => input.style.borderColor = '#ddd');
    }

    // Показать сообщение формы
    function showFormMessage(type, message) {
        const messageDiv = document.getElementById('formMessage') || createMessageDiv();

        messageDiv.innerHTML = `
            <div class="message-content ${type}">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        messageDiv.style.display = 'block';

        // Скрываем через 5 секунд
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    function createMessageDiv() {
        const div = document.createElement('div');
        div.id = 'formMessage';
        document.head.appendChild(style);

        orderForm.parentNode.insertBefore(div, orderForm);
        return div;
    }

    // Функция закрытия модальных окон (должна быть в коде)
    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.querySelector('.modal-overlay')?.classList.remove('active');
    }
}

/**
 * Видео
 */
function initVideo() {
    const videoPlaceholder = document.querySelector('.video-placeholder');

    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function () {
            const videoId = this.getAttribute('data-video-id') || '-Bx_418zHyU';
            const videoWrapper = this.parentElement;

            // Заменяем на iframe
            videoWrapper.innerHTML = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
                    title="Промо-ролик ведущего" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    style="position: absolute; top: 0; left: 0;"
                ></iframe>
            `;
        });
    }

    // Альтернативный вариант: видео с ленивой загрузкой
    const lazyVideoButtons = document.querySelectorAll('[data-load-video]');

    lazyVideoButtons.forEach(button => {
        button.addEventListener('click', function () {
            const videoId = this.getAttribute('data-video-id') || '-Bx_418zHyU';
            const targetId = this.getAttribute('data-target');
            const target = document.getElementById(targetId);

            if (target) {
                target.innerHTML = `
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                        title="Промо-ролик"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                `;
                this.style.display = 'none';
            }
        });
    });
}

/**
 * Анимации при скролле
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.price-card, .help-card, .stat-item, .gallery-item');

    if (!animatedElements.length) return;

    // Проверка видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }

    // Обработка скролла
    function handleScroll() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }

    // Дебаунс для оптимизации
    let scrollTimeout;
    function debounceScroll() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 50);
    }

    // Слушатель скролла
    window.addEventListener('scroll', debounceScroll);

    // Первоначальная проверка
    handleScroll();
}

/**
 * Обновление года в футере
 */
function updateFooterYear() {
    const yearElements = document.querySelectorAll('[data-current-year]');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // Обновление текста в копирайте
    const copyrightText = document.querySelector('.footer-bottom p:first-child');
    if (copyrightText && copyrightText.textContent.includes('2023')) {
        copyrightText.textContent = copyrightText.textContent.replace('2023', currentYear);
    }
}

/**
 * Плавная прокрутка
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const href = this.getAttribute('href');

            // Пропускаем якоря без ID
            if (href === '#') return;

            const targetElement = document.querySelector(href);

            if (targetElement) {
                event.preventDefault();

                // Рассчитываем позицию с учетом фиксированного хедера
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;

                // Плавная прокрутка
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Закрытие мобильного меню
                const navList = document.querySelector('.nav-list');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    if (mobileMenuBtn) {
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) {
                            icon.className = 'fas fa-bars';
                        }
                    }
                }
            }
        });
    });
}

/**
 * Вспомогательные функции
 */

// Debounce функция
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle функция
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Проверка мобильного устройства
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Проверка поддержки touch
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Форматирование телефона
function formatPhoneNumber(phone) {
    return phone.replace(/\D/g, '')
        .replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5');
}

/**
 * Обработчики для загрузки и ресайза
 */

// Ресайз окна
window.addEventListener('resize', debounce(function () {
    // Можно добавить логику при изменении размера
}, 250));

// Оффлайн/онлайн статус
window.addEventListener('online', function () {
    console.log('Соединение восстановлено');
});

window.addEventListener('offline', function () {
    console.log('Отсутствует соединение с интернетом');
});

// Предотвращение контекстного меню на изображениях (опционально)
document.addEventListener('contextmenu', function (event) {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});

// Инициализация при полной загрузке страницы
window.addEventListener('load', function () {
    console.log('TOP-WEDDING - страница полностью загружена');

    // Убираем прелоадер если есть
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }

    // Добавляем класс загруженной страницы
    document.body.classList.add('page-loaded');
});