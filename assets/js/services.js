// Инициализация страницы услуг
document.addEventListener('DOMContentLoaded', function () {
    initPackageSelection();
    initAddonSwitches();
    initAddonCounters();
    initCombinations();
    initOrderForm();
    updateSummary();
});

// Данные пакетов
const packagesData = {
    standard: {
        name: "Стандарт",
        price: 25000,
        features: [
            "Ведущий на 4 часа",
            "Разработка сценария",
            "Музыкальное сопровождение",
            "3 конкурса с призами"
        ]
    },
    premium: {
        name: "Премиум",
        price: 40000,
        features: [
            "Ведущий на 6 часов",
            "Индивидуальный сценарий",
            "Полный звуковой комплект",
            "6 конкурсов с призами",
            "Помощь в организации"
        ]
    },
    lux: {
        name: "Люкс",
        price: 60000,
        features: [
            "Ведущий на 8+ часов",
            "Эксклюзивный сценарий",
            "Профессиональное оборудование",
            "10+ конкурсов с призами",
            "Полная организация"
        ]
    }
};

// Данные дополнительных услуг
const addonsData = {
    dj: { name: "Профессиональный DJ", price: 8000, type: "switch" },
    'live-music': { name: "Живая музыка", price: 15000, type: "switch" },
    karaoke: { name: "Караоке система", price: 5000, type: "switch" },
    photobooth: { name: "Фотобудка", price: 10000, type: "switch" },
    animator: { name: "Аниматор для детей", price: 7000, type: "switch" },
    'show-program': { name: "Шоу-программа", price: 12000, type: "switch" },
    'extra-hour': { name: "Дополнительный час работы", price: 3000, type: "counter" },
    'extra-guest': { name: "Дополнительные гости", price: 200, type: "counter" },
    consultation: { name: "Расширенная консультация", price: 0, type: "switch" }
};

// Текущая конфигурация
let currentConfig = {
    package: 'premium',
    addons: {},
    subtotal: 0,
    discount: 0,
    total: 0
};

// Выбор пакета
function initPackageSelection() {
    const packageCards = document.querySelectorAll('.package-card');
    const selectButtons = document.querySelectorAll('.btn-select-package');

    packageCards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (!e.target.classList.contains('btn-select-package')) {
                const packageType = this.dataset.package;
                selectPackage(packageType);
            }
        });
    });

    selectButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const packageType = this.dataset.package;
            selectPackage(packageType);
        });
    });

    // Инициализируем выбранный пакет по умолчанию
    selectPackage('premium');
}

function selectPackage(packageType) {
    // Обновляем визуальное состояние
    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('active');
    });

    document.querySelectorAll('.btn-select-package').forEach(btn => {
        btn.classList.remove('active');
        btn.innerHTML = 'Выбрать этот пакет';
    });

    const selectedCard = document.querySelector(`.package-card[data-package="${packageType}"]`);
    const selectedButton = selectedCard?.querySelector('.btn-select-package');

    if (selectedCard && selectedButton) {
        selectedCard.classList.add('active');
        selectedButton.classList.add('active');
        selectedButton.innerHTML = '<i class="fas fa-check-circle"></i> Выбран';
    }

    // Обновляем конфигурацию
    currentConfig.package = packageType;
    updateSummary();
}

// Переключатели дополнительных услуг
function initAddonSwitches() {
    const switches = document.querySelectorAll('.addon-switch input[type="checkbox"]');

    switches.forEach(switchElement => {
        // Инициализируем состояние
        const addonItem = switchElement.closest('.addon-item');
        const addonType = addonItem.dataset.addon;

        if (addonType === 'consultation') {
            currentConfig.addons[addonType] = { quantity: 1 };
            addonItem.classList.add('active');
        }

        switchElement.addEventListener('change', function () {
            const addonItem = this.closest('.addon-item');
            const addonType = addonItem.dataset.addon;

            if (this.checked) {
                currentConfig.addons[addonType] = { quantity: 1 };
                addonItem.classList.add('active');
            } else {
                delete currentConfig.addons[addonType];
                addonItem.classList.remove('active');
            }

            updateSummary();
        });
    });
}

// Счетчики дополнительных услуг
function initAddonCounters() {
    const counters = document.querySelectorAll('.addon-counter');

    counters.forEach(counter => {
        const addonItem = counter.closest('.addon-item');
        const addonType = addonItem.dataset.addon;
        const minusBtn = counter.querySelector('.minus');
        const plusBtn = counter.querySelector('.plus');
        const valueElement = counter.querySelector('.counter-value');

        // Инициализируем значение
        if (!currentConfig.addons[addonType]) {
            currentConfig.addons[addonType] = { quantity: 0 };
        }

        valueElement.textContent = currentConfig.addons[addonType].quantity;

        // Обработчики кнопок
        minusBtn.addEventListener('click', function () {
            if (currentConfig.addons[addonType].quantity > 0) {
                currentConfig.addons[addonType].quantity--;
                valueElement.textContent = currentConfig.addons[addonType].quantity;

                if (currentConfig.addons[addonType].quantity === 0) {
                    delete currentConfig.addons[addonType];
                    addonItem.classList.remove('active');
                }

                updateSummary();
            }
        });

        plusBtn.addEventListener('click', function () {
            currentConfig.addons[addonType].quantity++;
            valueElement.textContent = currentConfig.addons[addonType].quantity;
            addonItem.classList.add('active');
            updateSummary();
        });
    });
}

// Популярные комбинации
function initCombinations() {
    const combinationButtons = document.querySelectorAll('.btn-apply-combination');

    combinationButtons.forEach(button => {
        button.addEventListener('click', function () {
            const combinationCard = this.closest('.combination-card');
            const combinationName = combinationCard.querySelector('h3').textContent;

            applyCombination(combinationName);
            showNotification(`Комбинация "${combinationName}" применена!`, 'success');
        });
    });
}

function applyCombination(combinationName) {
    // Сбрасываем текущую конфигурацию
    currentConfig = {
        package: 'premium',
        addons: {},
        subtotal: 0,
        discount: 0,
        total: 0
    };

    // Применяем комбинацию
    switch (combinationName) {
        case 'Свадебный пакет':
            currentConfig.package = 'premium';
            currentConfig.addons = {
                'live-music': { quantity: 1 },
                'photobooth': { quantity: 1 },
                'extra-hour': { quantity: 2 },
                'consultation': { quantity: 1 }
            };
            break;

        case 'Корпоративный пакет':
            currentConfig.package = 'premium';
            currentConfig.addons = {
                'dj': { quantity: 1 },
                'show-program': { quantity: 1 },
                'karaoke': { quantity: 1 },
                'consultation': { quantity: 1 }
            };
            break;

        case 'Семейный праздник':
            currentConfig.package = 'standard';
            currentConfig.addons = {
                'animator': { quantity: 1 },
                'photobooth': { quantity: 1 },
                'extra-hour': { quantity: 1 },
                'consultation': { quantity: 1 }
            };
            break;
    }

    // Обновляем визуальное состояние
    selectPackage(currentConfig.package);
    updateSwitchesAndCounters();
    updateSummary();
}

function updateSwitchesAndCounters() {
    // Обновляем переключатели
    document.querySelectorAll('.addon-switch input[type="checkbox"]').forEach(switchElement => {
        const addonItem = switchElement.closest('.addon-item');
        const addonType = addonItem.dataset.addon;

        if (currentConfig.addons[addonType]) {
            switchElement.checked = true;
            addonItem.classList.add('active');
        } else {
            switchElement.checked = false;
            addonItem.classList.remove('active');
        }
    });

    // Обновляем счетчики
    document.querySelectorAll('.addon-counter').forEach(counter => {
        const addonItem = counter.closest('.addon-item');
        const addonType = addonItem.dataset.addon;
        const valueElement = counter.querySelector('.counter-value');

        if (currentConfig.addons[addonType]) {
            valueElement.textContent = currentConfig.addons[addonType].quantity;
            addonItem.classList.add('active');
        } else {
            valueElement.textContent = '0';
            addonItem.classList.remove('active');
        }
    });
}

// Обновление итоговой суммы
function updateSummary() {
    // Рассчитываем стоимость пакета
    const packageData = packagesData[currentConfig.package];
    let subtotal = packageData.price;

    // Рассчитываем стоимость дополнительных услуг
    let addonsListHTML = '';

    for (const [addonType, data] of Object.entries(currentConfig.addons)) {
        const addonData = addonsData[addonType];
        const addonPrice = addonData.price * data.quantity;
        subtotal += addonPrice;

        addonsListHTML += `
            <div class="addon-summary-item">
                <span class="item-name">
                    ${addonData.name}
                    ${data.quantity > 1 ? `<span class="item-quantity">×${data.quantity}</span>` : ''}
                </span>
                <span class="item-price">${addonPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
        `;
    }

    // Рассчитываем скидку
    const discount = subtotal >= 50000 ? subtotal * 0.1 : 0;
    const total = subtotal - discount;

    // Обновляем конфигурацию
    currentConfig.subtotal = subtotal;
    currentConfig.discount = discount;
    currentConfig.total = total;

    // Обновляем DOM
    document.getElementById('addonsList').innerHTML = addonsListHTML;
    document.getElementById('subtotal').textContent = subtotal.toLocaleString('ru-RU') + ' ₽';
    document.getElementById('discount').textContent = '-' + discount.toLocaleString('ru-RU') + ' ₽';
    document.getElementById('total').textContent = total.toLocaleString('ru-RU') + ' ₽';

    // Обновляем список включенных возможностей
    updateFeaturesList();
}

function updateFeaturesList() {
    const featuresList = document.querySelector('.features-list');
    const packageData = packagesData[currentConfig.package];

    let featuresHTML = '';
    packageData.features.forEach(feature => {
        featuresHTML += `<li><i class="fas fa-check"></i> ${feature}</li>`;
    });

    featuresList.innerHTML = featuresHTML;
}

// Форма заказа
function initOrderForm() {
    const orderBtn = document.getElementById('createOrder');
    const saveBtn = document.getElementById('saveConfig');
    const modal = document.getElementById('orderModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModal = modal?.querySelector('.modal-close');
    const orderForm = document.getElementById('orderForm');

    // Кнопка "Оформить заказ"
    orderBtn.addEventListener('click', function () {
        openOrderModal();
    });

    // Кнопка "Сохранить конфигурацию"
    saveBtn.addEventListener('click', function () {
        saveConfiguration();
    });

    // Закрытие модального окна
    if (closeModal) {
        closeModal.addEventListener('click', closeOrderModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeOrderModal);
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeOrderModal();
        }
    });

    // Обработка формы
    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // В реальном проекте здесь отправка на сервер
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                email: this.querySelector('input[type="email"]').value,
                date: this.querySelector('input[type="date"]').value,
                notes: this.querySelector('textarea').value,
                configuration: currentConfig
            };

            console.log('Отправка заявки:', formData);

            // Показываем уведомление
            showNotification('Заявка отправлена! Мы свяжемся с вами в течение часа.', 'success');

            // Закрываем модальное окно
            closeOrderModal();

            // Очищаем форму
            this.reset();
        });
    }
}

function openOrderModal() {
    const modal = document.getElementById('orderModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const reviewItems = document.getElementById('reviewItems');
    const reviewTotal = document.getElementById('reviewTotal');

    // Формируем список заказа
    let reviewHTML = '';

    // Пакет
    const packageData = packagesData[currentConfig.package];
    reviewHTML += `
        <div class="review-item">
            <span class="item-name">Пакет "${packageData.name}"</span>
            <span class="item-price">${packageData.price.toLocaleString('ru-RU')} ₽</span>
        </div>
    `;

    // Дополнительные услуги
    for (const [addonType, data] of Object.entries(currentConfig.addons)) {
        const addonData = addonsData[addonType];
        const addonPrice = addonData.price * data.quantity;

        reviewHTML += `
            <div class="review-item">
                <span class="item-name">
                    ${addonData.name}
                    ${data.quantity > 1 ? ` ×${data.quantity}` : ''}
                </span>
                <span class="item-price">${addonPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
        `;
    }

    // Скидка
    if (currentConfig.discount > 0) {
        reviewHTML += `
            <div class="review-item" style="color: #4CAF50;">
                <span class="item-name">Скидка 10%</span>
                <span class="item-price">-${currentConfig.discount.toLocaleString('ru-RU')} ₽</span>
            </div>
        `;
    }

    reviewItems.innerHTML = reviewHTML;
    reviewTotal.textContent = currentConfig.total.toLocaleString('ru-RU') + ' ₽';

    // Открываем модальное окно
    modal.classList.add('active');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    const modalOverlay = document.querySelector('.modal-overlay');

    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function saveConfiguration() {
    // В реальном проекте здесь сохранение в localStorage или отправка на сервер
    const configString = JSON.stringify(currentConfig, null, 2);
    const blob = new Blob([configString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `конфигурация-праздника-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('Конфигурация сохранена!', 'success');
}

// Уведомления
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Удаление через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Добавляем стили для уведомлений
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        color: var(--dark-color);
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        border-left: 4px solid var(--primary-color);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left-color: #4CAF50;
    }
    
    .notification.error {
        border-left-color: #F44336;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .notification.success i {
        color: #4CAF50;
    }
    
    .notification.error i {
        color: #F44336;
    }
`;
document.head.appendChild(notificationStyles);

// Анимации при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.package-card, .addon-category, .combination-card, .faq-item');

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