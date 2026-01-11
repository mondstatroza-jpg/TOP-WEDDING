// Инициализация страницы "Как работает ведущий"
document.addEventListener('DOMContentLoaded', function () {
    initMachineAnimation();
    initTimelineSteps();
    initResponsibilityMap();
    initTimePlanner();
    initFAQAccordion();
    initCalculator();
    initModalWindows();
    initScrollAnimations();
});

// Анимация машины праздника
function initMachineAnimation() {
    const startBtn = document.getElementById('startMachine');
    const machineContainer = document.querySelector('.machine-container');
    const gears = document.querySelectorAll('.machine-gear');
    const conveyorBelt = document.querySelector('.conveyor-belt');
    const conveyorItems = document.querySelectorAll('.conveyor-item');
    const outputGlow = document.querySelector('.output-glow');

    let isRunning = false;

    startBtn.addEventListener('click', function () {
        isRunning = !isRunning;

        if (isRunning) {
            // Запуск анимации
            this.innerHTML = '<i class="fas fa-stop"></i> Остановить машину';
            this.classList.add('active');

            gears.forEach(gear => {
                gear.style.animationPlayState = 'running';
            });

            conveyorBelt.style.animationPlayState = 'running';
            conveyorItems.forEach(item => {
                item.style.animationPlayState = 'running';
            });

            outputGlow.style.animationPlayState = 'running';

            // Эффекты запуска
            machineContainer.style.boxShadow =
                '0 20px 40px rgba(0, 0, 0, 0.5), ' +
                'inset 0 0 50px rgba(212, 175, 55, 0.3), ' +
                '0 0 30px rgba(212, 175, 55, 0.5)';

            // Звуковой эффект (опционально)
            playMachineSound();

        } else {
            // Остановка анимации
            this.innerHTML = '<i class="fas fa-play"></i> Запустить машину праздника';
            this.classList.remove('active');

            gears.forEach(gear => {
                gear.style.animationPlayState = 'paused';
            });

            conveyorBelt.style.animationPlayState = 'paused';
            conveyorItems.forEach(item => {
                item.style.animationPlayState = 'paused';
            });

            outputGlow.style.animationPlayState = 'paused';

            machineContainer.style.boxShadow =
                '0 20px 40px rgba(0, 0, 0, 0.5), ' +
                'inset 0 0 50px rgba(212, 175, 55, 0.1)';
        }
    });

    function playMachineSound() {
        // Создаем звуковой контекст
        if (window.AudioContext || window.webkitAudioContext) {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);

                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.5);
            } catch (e) {
                console.log('Аудио недоступно:', e);
            }
        }
    }
}

// Временная шкала этапов
function initTimelineSteps() {
    const steps = document.querySelectorAll('.timeline-step');
    const detailButtons = document.querySelectorAll('.btn-step-detail');
    const videoButtons = document.querySelectorAll('.btn-step-video');

    // Данные для этапов
    const stepData = {
        1: {
            title: "Первая встреча - Знакомство и концепция",
            description: "Это самый важный этап, на котором мы знакомимся и создаем общее видение вашего праздника.",
            details: [
                "Личная встреча или онлайн-консультация",
                "Обсуждение ваших пожеланий и идей",
                "Анализ места проведения и технических возможностей",
                "Предварительная оценка бюджета",
                "Обсуждение тематики и стиля мероприятия"
            ],
            duration: "1-2 часа",
            videoId: "dQw4w9WgXcQ"
        },
        2: {
            title: "Разработка сценария - Творческий процесс",
            description: "Создаем уникальный сценарий, который отражает вашу индивидуальность.",
            details: [
                "Разработка индивидуального сценария",
                "Создание тайминга мероприятия",
                "Подбор музыки и развлечений",
                "Разработка конкурсов и игр",
                "Согласование всех деталей с вами"
            ],
            duration: "3-7 дней",
            videoId: "dQw4w9WgXcQ"
        },
        3: {
            title: "Подготовка команды - Сбор профессионалов",
            description: "Формируем идеальную команду специалистов для вашего праздника.",
            details: [
                "Подбор фотографа и видеографа",
                "Найм декоратора и флориста",
                "Привлечение музыкантов или DJ",
                "Координация работы кейтеринга",
                "Обучение команды под ваш сценарий"
            ],
            duration: "7-14 дней",
            videoId: "dQw4w9WgXcQ"
        }
    };

    // Активация этапов при скролле
    function activateStepsOnScroll() {
        steps.forEach(step => {
            const rect = step.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight * 0.8;

            if (isVisible) {
                setTimeout(() => {
                    step.classList.add('active');
                }, step.dataset.step * 200);
            }
        });
    }

    window.addEventListener('scroll', activateStepsOnScroll);
    activateStepsOnScroll(); // Первоначальная активация

    // Клик по этапу
    steps.forEach(step => {
        step.addEventListener('click', function () {
            const stepNumber = this.dataset.step;
            const data = stepData[stepNumber];

            if (data) {
                openStepModal(data);
            }
        });
    });

    // Кнопки "Подробнее"
    detailButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const stepNumber = this.dataset.step;
            const data = stepData[stepNumber];

            if (data) {
                openStepModal(data);
            }
        });
    });

    // Кнопки "Видео"
    videoButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const videoType = this.dataset.video;
            openVideoModal(videoType);
        });
    });
}

// Карта ответственности
function initResponsibilityMap() {
    const roles = document.querySelectorAll('.map-role');
    const lines = document.querySelectorAll('.line');

    roles.forEach(role => {
        role.addEventListener('mouseenter', function () {
            const roleType = this.dataset.role;
            highlightConnections(roleType);
            showRoleInfo(roleType);
        });

        role.addEventListener('mouseleave', function () {
            resetConnections();
            hideRoleInfo();
        });

        role.addEventListener('click', function () {
            const roleType = this.dataset.role;
            openRoleModal(roleType);
        });
    });

    function highlightConnections(roleType) {
        lines.forEach(line => {
            line.style.opacity = '0.2';
        });

        // Подсветка соответствующих линий
        const roleIndex = getRoleIndex(roleType);
        const lineIndex = roleIndex + 1; // line-1, line-2 и т.д.
        const line = document.querySelector(`.line-${lineIndex}`);

        if (line) {
            line.style.opacity = '1';
            line.style.background = `linear-gradient(to right, transparent, var(--primary-color), transparent)`;
        }
    }

    function resetConnections() {
        lines.forEach(line => {
            line.style.opacity = '0.3';
            line.style.background = `linear-gradient(to right, transparent, var(--primary-color), transparent)`;
        });
    }

    function getRoleIndex(roleType) {
        const rolesMap = {
            'host': 0,
            'dj': 1,
            'decor': 2,
            'photo': 3,
            'animator': 4
        };
        return rolesMap[roleType] || 0;
    }

    function showRoleInfo(roleType) {
        // Можно добавить всплывающую подсказку
    }

    function hideRoleInfo() {
        // Скрыть подсказку
    }

    function openRoleModal(roleType) {
        const roleData = {
            'host': {
                title: "Ведущий - Дирижер праздника",
                description: "Я отвечаю за общую координацию и проведение мероприятия.",
                responsibilities: [
                    "Разработка и проведение сценария",
                    "Контроль тайминга",
                    "Координация работы всех специалистов",
                    "Общение с гостями",
                    "Решение непредвиденных ситуаций"
                ],
                equipment: ["Микрофон", "Планшет с таймингом", "Радио для связи"]
            },
            'dj': {
                title: "DJ/Звукорежиссер - Создатель атмосферы",
                description: "Отвечает за музыкальное сопровождение и качество звука.",
                responsibilities: [
                    "Подбор и воспроизведение музыки",
                    "Настройка звукового оборудования",
                    "Работа с микрофонами",
                    "Создание музыкальных подборок",
                    "Звуковое оформление ключевых моментов"
                ],
                equipment: ["Звуковая система", "Микшерный пульт", "Ноутбук с музыкой"]
            }
        };

        const data = roleData[roleType];
        if (data) {
            openStepModal(data);
        }
    }
}

// Планировщик времени
function initTimePlanner() {
    const elements = document.querySelectorAll('.planner-element');
    const timelineSlots = document.getElementById('timelineSlots');
    const resetBtn = document.getElementById('resetPlanner');
    const saveBtn = document.getElementById('savePlanner');
    const plannerResult = document.getElementById('plannerResult');

    // Создаем слоты на временной шкале
    function createTimelineSlots() {
        timelineSlots.innerHTML = '';
        const hours = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

        hours.forEach(hour => {
            const slot = document.createElement('div');
            slot.className = 'timeline-slot';
            slot.dataset.time = hour;
            slot.addEventListener('dragover', handleDragOver);
            slot.addEventListener('drop', handleDrop);
            timelineSlots.appendChild(slot);
        });
    }

    // Перетаскивание элементов
    elements.forEach(element => {
        element.addEventListener('dragstart', handleDragStart);
    });

    let draggedElement = null;

    function handleDragStart(e) {
        draggedElement = this;
        e.dataTransfer.setData('text/plain', this.dataset.duration);
        this.style.opacity = '0.5';
    }

    function handleDragOver(e) {
        e.preventDefault();
        this.style.background = 'rgba(212, 175, 55, 0.2)';
    }

    function handleDrop(e) {
        e.preventDefault();
        this.style.background = '';

        if (draggedElement && !this.classList.contains('filled')) {
            const duration = parseInt(draggedElement.dataset.duration);
            const type = draggedElement.dataset.type;
            const text = draggedElement.querySelector('span').textContent;

            // Создаем элемент на временной шкале
            const timelineElement = document.createElement('div');
            timelineElement.className = 'timeline-element filled';
            timelineElement.innerHTML = `
                <div class="element-icon">
                    <i class="${draggedElement.querySelector('i').className}"></i>
                </div>
                <div class="element-text">${text}</div>
                <div class="element-duration">${duration} мин</div>
            `;
            timelineElement.style.background = getElementColor(type);

            this.appendChild(timelineElement);
            this.classList.add('filled');

            draggedElement.style.opacity = '1';
            draggedElement = null;

            updatePlannerResult();
        }
    }

    function getElementColor(type) {
        const colors = {
            'speech': 'rgba(33, 150, 243, 0.3)',
            'food': 'rgba(76, 175, 80, 0.3)',
            'game': 'rgba(156, 39, 176, 0.3)',
            'dance': 'rgba(255, 87, 34, 0.3)',
            'show': 'rgba(255, 193, 7, 0.3)'
        };
        return colors[type] || 'rgba(212, 175, 55, 0.3)';
    }

    // Сброс планировщика
    resetBtn.addEventListener('click', function () {
        timelineSlots.innerHTML = '';
        createTimelineSlots();
        plannerResult.classList.remove('active');
    });

    // Сохранение плана
    saveBtn.addEventListener('click', function () {
        const filledSlots = document.querySelectorAll('.timeline-slot.filled');

        if (filledSlots.length === 0) {
            alert('Добавьте хотя бы один элемент на временную шкалу!');
            return;
        }

        plannerResult.classList.add('active');
        updatePlannerResult();

        // Показываем уведомление
        showNotification('План сохранен!', 'success');
    });

    function updatePlannerResult() {
        const resultTimeline = document.getElementById('resultTimeline');
        const filledSlots = document.querySelectorAll('.timeline-slot.filled');
        const totalDuration = document.getElementById('totalDuration');
        const elementCount = document.getElementById('elementCount');
        const freeTime = document.getElementById('freeTime');

        let totalMinutes = 0;
        let html = '';

        filledSlots.forEach(slot => {
            const time = slot.dataset.time;
            const element = slot.querySelector('.timeline-element');
            const duration = parseInt(element.querySelector('.element-duration').textContent);
            const text = element.querySelector('.element-text').textContent;

            totalMinutes += duration;

            html += `
                <div class="result-item">
                    <span class="result-item-time">${time}</span>
                    <span class="result-item-title">${text}</span>
                    <span class="result-item-duration">${duration} мин</span>
                </div>
            `;
        });

        resultTimeline.innerHTML = html;
        elementCount.textContent = filledSlots.length;

        const totalHours = Math.floor(totalMinutes / 60);
        const remainingMinutes = totalMinutes % 60;
        totalDuration.textContent = `${totalHours}ч ${remainingMinutes}мин`;

        const totalAvailable = 7 * 60; // 7 часов
        const freeMinutes = totalAvailable - totalMinutes;
        const freeHours = Math.floor(freeMinutes / 60);
        const freeRemaining = freeMinutes % 60;
        freeTime.textContent = `${freeHours}ч ${freeRemaining}мин`;
    }

    createTimelineSlots();
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

// Калькулятор стоимости
function initCalculator() {
    const steps = document.querySelectorAll('.calc-step');
    const nextBtn = document.getElementById('nextStep');
    const prevBtn = document.getElementById('prevStep');
    const calculateBtn = document.getElementById('calculateBtn');
    const guestSlider = document.getElementById('guestSlider');
    const guestValue = document.getElementById('guestValue');
    let currentStep = 1;

    // Обновление значения слайдера
    guestSlider.addEventListener('input', function () {
        guestValue.textContent = this.value;
        updateCalculation();
    });

    // Радио кнопки
    document.querySelectorAll('input[name="eventType"], input[name="duration"]').forEach(input => {
        input.addEventListener('change', updateCalculation);
    });

    // Навигация по шагам
    nextBtn.addEventListener('click', function () {
        if (validateStep(currentStep)) {
            if (currentStep < 3) {
                steps[currentStep - 1].classList.remove('active');
                currentStep++;
                steps[currentStep - 1].classList.add('active');

                if (currentStep === 3) {
                    nextBtn.style.display = 'none';
                    calculateBtn.style.display = 'inline-flex';
                }

                updateNavigation();
            }
        }
    });

    prevBtn.addEventListener('click', function () {
        if (currentStep > 1) {
            steps[currentStep - 1].classList.remove('active');
            currentStep--;
            steps[currentStep - 1].classList.add('active');

            if (currentStep < 3) {
                nextBtn.style.display = 'inline-flex';
                calculateBtn.style.display = 'none';
            }

            updateNavigation();
        }
    });

    calculateBtn.addEventListener('click', function () {
        if (validateStep(currentStep)) {
            updateCalculation();
            showNotification('Расчет обновлен!', 'success');
        }
    });

    function validateStep(step) {
        switch (step) {
            case 1:
                const eventTypeSelected = document.querySelector('input[name="eventType"]:checked');
                if (!eventTypeSelected) {
                    showNotification('Пожалуйста, выберите тип мероприятия', 'error');
                    return false;
                }
                break;
            case 3:
                const durationSelected = document.querySelector('input[name="duration"]:checked');
                if (!durationSelected) {
                    showNotification('Пожалуйста, выберите длительность', 'error');
                    return false;
                }
                break;
        }
        return true;
    }

    function updateNavigation() {
        prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
    }

    function updateCalculation() {
        const eventType = document.querySelector('input[name="eventType"]:checked');
        const duration = document.querySelector('input[name="duration"]:checked');
        const guests = parseInt(guestSlider.value);

        if (eventType && duration) {
            // Расчет стоимости
            let basePrice = 25000;

            // Коэффициенты
            const eventCoefficients = {
                'wedding': 1.2,
                'corporate': 1.3,
                'anniversary': 1.1,
                'birthday': 1.0
            };

            const durationCoefficients = {
                '4': 0.8,
                '6': 1.0,
                '8': 1.3
            };

            const guestCoefficient = 1 + (guests - 50) * 0.002; // +0.2% за каждого гостя сверх 50

            const coefficient =
                eventCoefficients[eventType.value] *
                durationCoefficients[duration.value] *
                guestCoefficient;

            const estimatedPrice = Math.round(basePrice * coefficient);

            // Обновление результатов
            document.getElementById('estimatedPrice').textContent =
                estimatedPrice.toLocaleString('ru-RU');

            document.getElementById('resultType').textContent =
                eventType.parentElement.querySelector('span').textContent;

            document.getElementById('resultGuests').textContent = guests;
            document.getElementById('resultDuration').textContent = duration.value + ' часов';
        }
    }

    // Инициализация
    updateNavigation();
    updateCalculation();
}

// Модальные окна
function initModalWindows() {
    const stepModal = document.getElementById('stepModal');
    const videoModal = document.getElementById('videoModal');
    const modalOverlay = document.querySelector('.modal-overlay');

    function openStepModal(data) {
        const modalContent = document.getElementById('stepModalContent');

        modalContent.innerHTML = `
            <div class="step-modal-content">
                <h2>${data.title}</h2>
                <p class="modal-description">${data.description}</p>
                
                ${data.duration ? `<div class="modal-duration"><i class="fas fa-clock"></i> Длительность этапа: ${data.duration}</div>` : ''}
                
                ${data.responsibilities ? `
                    <div class="modal-section">
                        <h3><i class="fas fa-tasks"></i> Обязанности:</h3>
                        <ul>
                            ${data.responsibilities.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${data.details ? `
                    <div class="modal-section">
                        <h3><i class="fas fa-clipboard-list"></i> Что включает этап:</h3>
                        <ul>
                            ${data.details.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${data.equipment ? `
                    <div class="modal-section">
                        <h3><i class="fas fa-tools"></i> Используемое оборудование:</h3>
                        <div class="equipment-grid">
                            ${data.equipment.map(item => `<span class="equipment-item">${item}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="modal-actions">
                    <button class="btn btn-primary open-modal" data-type="order">
                        <i class="fas fa-calendar-check"></i> Забронировать консультацию
                    </button>
                </div>
            </div>
        `;

        stepModal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function openVideoModal(videoType) {
        const videoContainer = document.getElementById('videoContainer');
        const videoIds = {
            'meeting': 'dQw4w9WgXcQ',
            'scenario': 'dQw4w9WgXcQ',
            'team': 'dQw4w9WgXcQ',
            'tech': 'dQw4w9WgXcQ',
            'rehearsal': 'dQw4w9WgXcQ',
            'day': 'dQw4w9WgXcQ',
            'after': 'dQw4w9WgXcQ'
        };

        const videoId = videoIds[videoType] || 'dQw4w9WgXcQ';

        videoContainer.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1" 
                title="Видео процесса работы"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;

        videoModal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Закрытие модальных окон
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });

    modalOverlay.addEventListener('click', closeAllModals);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    function closeAllModals() {
        stepModal.classList.remove('active');
        videoModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Анимации при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.timeline-step, .map-role, .planner-element, .faq-item, .calc-option');

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
        background: rgba(30, 30, 30, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        border: 1px solid rgba(212, 175, 55, 0.3);
        backdrop-filter: blur(10px);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left: 4px solid #4CAF50;
    }
    
    .notification.error {
        border-left: 4px solid #F44336;
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