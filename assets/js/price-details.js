// Инициализация страницы деталей цен
document.addEventListener('DOMContentLoaded', function () {
    initPackageNavigation();
    initFAQAccordion();
    initScrollSpy();
    initModalButtons();
    initComparisonTable();
});

// Навигация по пакетам
function initPackageNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const packageSections = document.querySelectorAll('.package-section, .comparison-section');

    // Плавная прокрутка к секциям
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Обновляем активную ссылку
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Плавная прокрутка
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обновление активной ссылки при скролле
    function updateActiveLink() {
        let currentSection = '';

        packageSections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + section.id;
            }
        });

        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Инициализация при загрузке
}

// FAQ аккордеон
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            // Закрываем все остальные элементы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Переключаем текущий элемент
            item.classList.toggle('active');
        });
    });
}

// Отслеживание скролла для анимаций
function initScrollSpy() {
    const animatedElements = document.querySelectorAll('.package-section, .comparison-section, .pricing-faq');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Кнопки модальных окон
function initModalButtons() {
    const modalButtons = document.querySelectorAll('.open-modal');

    modalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modalType = this.getAttribute('data-type');
            const planType = this.getAttribute('data-plan');

            // В реальном проекте здесь открытие модального окна
            console.log('Открытие модального окна:', { modalType, planType });

            // Показываем уведомление
            showNotification(`Запрос на пакет "${planType}" отправлен!`, 'success');
        });
    });

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        // Стили для уведомления
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px 25px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 10000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            border-left: 4px solid ${type === 'success' ? '#4CAF50' : '#F44336'};
        `;

        document.body.appendChild(notification);

        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Удаление через 5 секунд
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Интерактивная таблица сравнения
function initComparisonTable() {
    const tableRows = document.querySelectorAll('.table-row');
    const popularPlan = document.querySelector('.table-plan.popular');

    // Подсветка популярного плана
    if (popularPlan) {
        const popularIndex = Array.from(popularPlan.parentElement.children).indexOf(popularPlan);

        tableRows.forEach(row => {
            const popularCell = row.children[popularIndex];
            if (popularCell) {
                popularCell.style.background = 'rgba(212, 175, 55, 0.05)';
                popularCell.style.transition = 'background-color 0.3s ease';

                row.addEventListener('mouseenter', function () {
                    popularCell.style.background = 'rgba(212, 175, 55, 0.1)';
                });

                row.addEventListener('mouseleave', function () {
                    popularCell.style.background = 'rgba(212, 175, 55, 0.05)';
                });
            }
        });
    }

    // Клик по строке для выделения
    tableRows.forEach(row => {
        row.addEventListener('click', function () {
            const feature = this.querySelector('.table-feature').textContent;
            const plans = Array.from(this.querySelectorAll('.table-plan')).map(cell => cell.textContent);

            console.log('Выбрана функция:', feature);
            console.log('Доступно в планах:', plans);

            // Минимальная обратная связь
            this.style.background = '#f8f9fa';
            setTimeout(() => {
                this.style.background = '';
            }, 300);
        });
    });
}

// Копирование информации о пакетах
function initCopyFeatures() {
    // В реальном проекте можно добавить кнопки копирования
    // для быстрого сохранения информации о пакетах
}

// Инициализация всех функций
initCopyFeatures();

// Автоматическое раскрытие FAQ при переходе по якорю
window.addEventListener('hashchange', function () {
    const hash = window.location.hash;

    if (hash.includes('faq')) {
        const faqItem = document.querySelector(`${hash}`);
        if (faqItem) {
            setTimeout(() => {
                faqItem.classList.add('active');
            }, 300);
        }
    }
});