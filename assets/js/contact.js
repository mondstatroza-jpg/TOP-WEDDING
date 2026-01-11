// Инициализация страницы контактов
document.addEventListener('DOMContentLoaded', function () {
    initCopyButtons();
    initContactForm();
    initQuickActions();
    initFAQAccordion();
    initChatWidget();
    initMapActions();
});

// Копирование контактов
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.method-copy');
    const notification = document.getElementById('copyNotification');

    copyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const textToCopy = this.getAttribute('data-text');

            // Используем Clipboard API если доступен
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => showCopyNotification())
                    .catch(err => {
                        console.error('Ошибка копирования:', err);
                        fallbackCopy(textToCopy);
                    });
            } else {
                fallbackCopy(textToCopy);
            }
        });
    });

    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyNotification();
    }

    function showCopyNotification() {
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Форма обратной связи
function initContactForm() {
    const form = document.getElementById('contactForm');
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    if (!form) return;

    // Подсчет символов в поле сообщения
    if (messageField && charCount) {
        messageField.addEventListener('input', function () {
            charCount.textContent = this.value.length;

            if (this.value.length > 500) {
                charCount.style.color = '#F44336';
            } else if (this.value.length > 400) {
                charCount.style.color = '#FF9800';
            } else {
                charCount.style.color = 'inherit';
            }
        });
    }

    // Обработка отправки формы
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Валидация
        if (!validateForm()) {
            return;
        }

        // Сбор данных формы
        const formData = {
            name: this.querySelector('#name').value,
            contact: this.querySelector('#contact').value,
            eventType: this.querySelector('#eventType').value,
            eventDate: this.querySelector('#eventDate').value,
            guests: this.querySelector('#guests').value,
            message: this.querySelector('#message').value,
            agreement: this.querySelector('#agreement').checked,
            newsletter: this.querySelector('#newsletter').checked,
            timestamp: new Date().toISOString()
        };

        // В реальном проекте здесь отправка на сервер
        console.log('Данные формы:', formData);

        // Показываем уведомление об успехе
        showFormNotification('success', 'Заявка отправлена! Я свяжусь с вами в течение 30 минут.');

        // Сбрасываем форму
        this.reset();
        charCount.textContent = '0';

        // Закрываем чат, если он открыт
        closeChat();
    });

    function validateForm() {
        const name = form.querySelector('#name');
        const contact = form.querySelector('#contact');
        const agreement = form.querySelector('#agreement');

        let isValid = true;

        // Проверка имени
        if (!name.value.trim()) {
            showFormError(name, 'Введите ваше имя');
            isValid = false;
        } else {
            clearFormError(name);
        }

        // Проверка контакта
        if (!contact.value.trim()) {
            showFormError(contact, 'Введите телефон или email');
            isValid = false;
        } else if (!isValidContact(contact.value)) {
            showFormError(contact, 'Введите корректный телефон или email');
            isValid = false;
        } else {
            clearFormError(contact);
        }

        // Проверка согласия
        if (!agreement.checked) {
            showFormError(agreement, 'Необходимо согласие на обработку данных');
            isValid = false;
        } else {
            clearFormError(agreement);
        }

        return isValid;
    }

    function isValidContact(value) {
        // Простая валидация телефона или email
        const phoneRegex = /^[\+]?[7-8]?[0-9\s\-\(\)]{10,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) || emailRegex.test(value);
    }

    function showFormError(element, message) {
        const formGroup = element.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');

        if (existingError) {
            existingError.textContent = message;
        } else {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            errorElement.style.color = '#F44336';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '5px';

            if (element.type === 'checkbox') {
                element.parentElement.appendChild(errorElement);
            } else {
                formGroup.appendChild(errorElement);
            }
        }

        element.style.borderColor = '#F44336';
    }

    function clearFormError(element) {
        const formGroup = element.closest('.form-group');
        const errorElement = formGroup?.querySelector('.error-message');

        if (errorElement) {
            errorElement.remove();
        }

        element.style.borderColor = '';
    }
}

// Быстрые действия
function initQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    const openChatButton = document.querySelector('.open-chat');

    actionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const actionType = this.classList[1]; // call-now, whatsapp и т.д.

            switch (actionType) {
                case 'call-now':
                    window.location.href = 'tel:+79991234567';
                    break;
                case 'whatsapp':
                    window.open('https://wa.me/79991234567', '_blank');
                    break;
                case 'telegram':
                    window.open('https://t.me/topwedding', '_blank');
                    break;
                case 'schedule':
                    window.location.href = 'services.html';
                    break;
            }
        });
    });

    if (openChatButton) {
        openChatButton.addEventListener('click', function () {
            openChat();
        });
    }
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

// Чат-виджет
function initChatWidget() {
    const chatWidget = document.getElementById('chatWidget');
    const chatClose = chatWidget.querySelector('.chat-close');
    const chatInput = chatWidget.querySelector('#chatInput');
    const chatSend = chatWidget.querySelector('.chat-send');
    const quickButtons = chatWidget.querySelectorAll('.quick-btn');
    const chatMessages = chatWidget.querySelector('.chat-messages');

    let isChatOpen = false;

    // Открытие чата по кнопке
    window.openChat = function () {
        chatWidget.classList.add('active');
        isChatOpen = true;

        // Фокус на поле ввода
        setTimeout(() => {
            chatInput.focus();
        }, 300);
    };

    // Закрытие чата
    window.closeChat = function () {
        chatWidget.classList.remove('active');
        isChatOpen = false;
    };

    // Закрытие по кнопке
    chatClose.addEventListener('click', closeChat);

    // Отправка сообщения
    function sendMessage() {
        const message = chatInput.value.trim();

        if (!message) return;

        // Добавляем сообщение пользователя
        addMessage(message, 'user');

        // Очищаем поле ввода
        chatInput.value = '';

        // Имитируем ответ бота
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }

    // Отправка по Enter
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Отправка по кнопке
    chatSend.addEventListener('click', sendMessage);

    // Быстрые вопросы
    quickButtons.forEach(button => {
        button.addEventListener('click', function () {
            const question = this.getAttribute('data-question');

            // Добавляем вопрос пользователя
            addMessage(question, 'user');

            // Имитируем ответ бота
            setTimeout(() => {
                const response = getBotResponse(question);
                addMessage(response, 'bot');
            }, 1000);
        });
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const time = new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-time">${time}</div>
        `;

        chatMessages.appendChild(messageDiv);

        // Прокрутка к новому сообщению
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(question) {
        const responses = {
            'стоимость': 'Стоимость зависит от выбранного пакета и дополнительных услуг. Рекомендую ознакомиться с разделом "Услуги" или оставить заявку для индивидуального расчета.',
            'даты': 'Актуальные свободные даты могу сообщить после уточнения деталей мероприятия. Чаще всего свободны будние дни и некоторые выходные через 2-3 месяца.',
            'встреч': 'Конечно! Можем встретиться в моем офисе на Тверской. Просто выберите удобное время и дайте знать заранее.',
            'договор': 'Работаю по официальному договору. Могу выслать шаблон для ознакомления. Все условия согласовываются индивидуально.',
            'оплата': 'Оплата происходит в 3 этапа: 30% предоплата, 50% за неделю до мероприятия, 20% в день праздника.'
        };

        question = question.toLowerCase();

        for (const [key, response] of Object.entries(responses)) {
            if (question.includes(key)) {
                return response;
            }
        }

        return 'Спасибо за ваш вопрос! Чтобы дать максимально точный ответ, лучше обсудить детали по телефону или при личной встрече. Могу я вам перезвонить?';
    }
}

// Действия с картой
function initMapActions() {
    const mapButton = document.querySelector('.btn-map');

    if (mapButton) {
        mapButton.addEventListener('click', function () {
            // В реальном проекте здесь открытие карты с маршрутом
            const address = encodeURIComponent('Москва, ул. Тверская, 18');
            window.open(`https://yandex.ru/maps/?text=${address}`, '_blank');
        });
    }
}

// Уведомления для формы
function showFormNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
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

// Автооткрытие чата при бездействии
setTimeout(() => {
    if (!document.querySelector('.chat-widget.active')) {
        const hasInteracted = sessionStorage.getItem('hasInteracted');

        if (!hasInteracted) {
            setTimeout(() => {
                openChat();
                sessionStorage.setItem('hasInteracted', 'true');
            }, 10000); // 10 секунд
        }
    }
}, 1000);

// Анимации при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.contact-card, .form-card, .quick-actions, .map-card, .faq-item');

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
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Инициализируем анимации
initScrollAnimations();