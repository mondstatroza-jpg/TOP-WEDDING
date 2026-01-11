// Инициализация портфолио при загрузке DOM
document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio JS loaded');

    initPortfolioFilter();
    initPortfolioModal();
    initTestimonialsSlider();
    initStatsCounter();
    initLoadMore();
    initFloatingAnimation();
});

// Фильтрация портфолио
function initPortfolioFilter() {
    console.log('Initializing portfolio filter...');

    const filterButtons = document.querySelectorAll('.filter-tab');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (!filterButtons.length || !portfolioItems.length) {
        console.warn('Filter elements not found');
        return;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            console.log('Filter clicked:', this.getAttribute('data-filter'));

            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Анимация фильтрации
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    console.log('Portfolio filter initialized');
}

// Данные для модальных окон
const portfolioData = {
    1: {
        title: "Анна & Максим - Свадьба в Венецианском стиле",
        category: "Свадьба",
        date: "15 июля 2023",
        location: "Ресторан 'Империя', Москва",
        guests: "120 гостей",
        duration: "8 часов",
        description: "Романтическая свадьба в стиле 'Венецианский карнавал'. Мы создали атмосферу настоящего итальянского праздника с элементами театрализованного представления. Каждый гость получил карнавальную маску и стал частью этого волшебного действа.",
        highlights: [
            "Театрализованное представление с актерами",
            "Живая скрипичная музыка",
            "Интерактивные зоны для фото",
            "Карнавальный парад масок",
            "Фейерверк над Москвой-рекой"
        ],
        testimonial: "Роман создал для нас настоящую сказку! Каждый момент свадьбы был продуман до мелочей. Гости до сих пор вспоминают карнавальный парад и говорят, что это лучшая свадьба в их жизни!",
        client: "Анна Смирнова",
        images: [
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1520854221256-17463ccb8b9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    2: {
        title: "TechCompany Annual Party - Киберпанк 2077",
        category: "Корпоратив",
        date: "20 мая 2023",
        location: "Loft-пространство 'Гараж', Санкт-Петербург",
        guests: "250 сотрудников",
        duration: "6 часов",
        description: "Годовой корпоратив IT-компании с темой 'Киберпанк 2077'. Мы превратили обычное офисное пространство в футуристический мегаполис будущего с неоновыми вывесками, голограммами и интерактивными инсталляциями.",
        highlights: [
            "VR-зона с симуляторами будущего",
            "Голографические проекции",
            "Кибер-квест для команд",
            "DJ-сет в стиле synthwave",
            "Неоновая фотозона"
        ],
        testimonial: "Организация на высшем уровне! Роман и его команда создали уникальную атмосферу будущего. Коллеги до сих пор обсуждают VR-симуляторы и квест. Лучший корпоратив за всю историю компании!",
        client: "Дмитрий Волков, HR-директор",
        images: [
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1519677100203-6f5d4c7a08c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1492684223066-e9e4aab4d25e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    3: {
        title: "50 лет Виктории Ивановне - Золотая осень",
        category: "Юбилей",
        date: "8 марта 2023",
        location: "Загородный клуб 'Русь', Подмосковье",
        guests: "60 гостей",
        duration: "5 часов",
        description: "Торжественный юбилей в стиле 'Золотая осень'. Мы создали теплую семейную атмосферу, где объединились три поколения. Осенние декорации, живая музыка и душевные конкурсы сделали этот вечер незабываемым.",
        highlights: [
            "Живой струнный оркестр",
            "Фотозона 'Осенний парк'",
            "Семейная викторина с архивными фото",
            "Торт в виде осеннего дерева",
            "Запуск небесных фонариков"
        ],
        testimonial: "Спасибо за прекрасный юбилей! Роман нашел подход ко всем - от маленьких внуков до друзей молодости. Вечер прошел в теплой, душевной атмосфере. Все гости были в восторге!",
        client: "Виктория Иванова",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    4: {
        title: "30 лет Алексею - Ретро-дискотека 90-х",
        category: "День рождения",
        date: "14 февраля 2023",
        location: "Караоке-бар 'Голос', Москва",
        guests: "40 друзей",
        duration: "7 часов",
        description: "Вечеринка в стиле 'Ретро-дискотека 90-х' с полным погружением в эпоху. Гости пришли в костюмах 90-х, играли на игровых приставках того времени и пели хиты в караоке.",
        highlights: [
            "Костюмированная тематика 90-х",
            "Караоке-баттл с призами",
            "Ретро-игровая зона (Dendy, Sega)",
            "Дискотека с хитами 90-х",
            "Фотозона в стиле старых фотоаппаратов"
        ],
        testimonial: "Лучший день рождения в моей жизни! Роман воссоздал атмосферу нашего детства и юности. Все друзья до сих пор под впечатлением от караоке-баттла!",
        client: "Алексей Петров",
        images: [
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    5: {
        title: "Екатерина & Дмитрий - Эко-свадьба на природе",
        category: "Свадьба",
        date: "10 сентября 2022",
        location: "Загородный отель 'Лесная сказка', Калужская область",
        guests: "80 гостей",
        duration: "2 дня",
        description: "Свадьба на природе в эко-стиле с двухдневным празднованием. Мы организовали кемпинг для гостей, активные развлечения на свежем воздухе и романтическую церемонию на закате.",
        highlights: [
            "Двухдневное празднование с кемпингом",
            "Эко-декор из натуральных материалов",
            "Активные игры на свежем воздухе",
            "Романтическая церемония на закате",
            "Баня и спа-зона для гостей"
        ],
        testimonial: "Мечтали о свадьбе на природе, и Роман воплотил нашу мечту в реальность! Два дня праздника пролетели как один миг. Спасибо за организацию кемпинга - это было невероятно!",
        client: "Екатерина и Дмитрий",
        images: [
            "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1520854221256-17463ccb8b9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    6: {
        title: "Новогодний корпоратив 'FinanceGroup' - Великий Гэтсби",
        category: "Корпоратив",
        date: "25 декабря 2022",
        location: "Банкетный зал 'Царский', Москва",
        guests: "300 сотрудников",
        duration: "8 часов",
        description: "Новогодняя вечеринка в стиле 'Великий Гэтсби' для финансовой компании. Роскошный декор эпохи джаза, шоу-программа с профессиональными артистами и лотерея с ценными призами.",
        highlights: [
            "Декор в стиле 20-х годов",
            "Живой джаз-бэнд",
            "Шоу-программа с артистами",
            "Лотерея с ценными призами",
            "Фотозона в стиле 'Великий Гэтсби'"
        ],
        testimonial: "Идеальная организация новогоднего корпоратива! Роман учел все пожелания и создал атмосферу роскоши 20-х годов. Лотерея с призами стала главным хитом вечера!",
        client: "Мария Соколова, руководитель отдела",
        images: [
            "https://images.unsplash.com/photo-1519677100203-6f5d4c7a08c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1492684223066-e9e4aab4d25e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    7: {
        title: "Выпускной 11-х классов - Церемония 'Оскар'",
        category: "Выпускной",
        date: "25 июня 2022",
        location: "Школа №157, Москва",
        guests: "100 выпускников",
        duration: "6 часов",
        description: "Торжественный выпускной вечер с тематикой 'Оскар'. Мы организовали настоящую церемонию награждения с номинациями для каждого выпускника, красной дорожкой и фотосессией как у звезд.",
        highlights: [
            "Церемония награждения 'Оскар'",
            "Красная дорожка для выпускников",
            "Профессиональная фотосессия",
            "Танцевальный флешмоб",
            "Интерактивная стена пожеланий"
        ],
        testimonial: "Выпускной, о котором мечтали все ученики! Роман сделал каждого выпускника звездой этого вечера. Церемония награждения была трогательной и веселой одновременно!",
        client: "Ольга Иванова, классный руководитель",
        images: [
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    8: {
        title: "25 лет вместе: Ольга & Игорь - Серебряная свадьба",
        category: "Серебряная свадьба",
        date: "18 апреля 2022",
        location: "Ресторан 'У Петровича', Москва",
        guests: "50 гостей",
        duration: "5 часов",
        description: "Торжество в честь серебряной свадьбы с воссозданием атмосферы 90-х годов, когда пара познакомилась. Мы подготовили ностальгическую программу с музыкой, конкурсами и историями из прошлого.",
        highlights: [
            "Ностальгическая программа 90-х",
            "Воссоздание первого свидания",
            "Семейное древо с фотографиями",
            "Торт в виде цифры 25",
            "Видеопоздравления от детей и внуков"
        ],
        testimonial: "Спасибо за волшебный вечер! Роман помог нам вспомнить самые теплые моменты нашей 25-летней истории. Гости плакали от умиления во время показа старых фотографий!",
        client: "Ольга и Игорь",
        images: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    }
};

// Модальное окно с деталями мероприятия
function initPortfolioModal() {
    console.log('Initializing portfolio modal...');

    const viewButtons = document.querySelectorAll('.btn-view-details');
    const modal = document.getElementById('portfolioModal');
    const modalOverlay = document.querySelector('.modal-overlay');

    if (!viewButtons.length || !modal) {
        console.warn('Modal elements not found');
        return;
    }

    viewButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const itemId = this.getAttribute('data-item');
            console.log('View details clicked for item:', itemId);

            const data = portfolioData[itemId];

            if (!data) {
                console.error(`Data for item ${itemId} not found`);
                alert('Информация об этом мероприятии пока недоступна');
                return;
            }

            openPortfolioModal(data);
        });
    });

    console.log('Portfolio modal initialized');
}

// Функция открытия модального окна
function openPortfolioModal(data) {
    const modal = document.getElementById('portfolioModal');
    const modalContent = document.getElementById('modalContent');
    const modalOverlay = document.querySelector('.modal-overlay');

    if (!modal || !modalContent || !modalOverlay) {
        console.error('Modal elements not found');
        return;
    }

    // Заполняем модальное окно данными
    modalContent.innerHTML = `
        <div class="event-details">
            <div class="event-gallery">
                <div class="main-event-image">
                    <img src="${data.images[0]}" alt="${data.title}" id="mainImage">
                </div>
                <div class="event-thumbnails">
                    ${data.images.map((img, index) => `
                        <div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
                            <img src="${img}" alt="Фото ${index + 1}">
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="event-info">
                <h2>${data.title}</h2>
                <div class="event-meta">
                    <span><i class="fas fa-tag"></i> ${data.category}</span>
                    <span><i class="fas fa-calendar"></i> ${data.date}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${data.location}</span>
                    <span><i class="fas fa-users"></i> ${data.guests}</span>
                    <span><i class="fas fa-clock"></i> ${data.duration}</span>
                </div>
                
                <div class="event-description">
                    <p>${data.description}</p>
                </div>
                
                <div class="event-highlights">
                    <h3><i class="fas fa-star"></i> Особенности мероприятия:</h3>
                    <ul>
                        ${data.highlights.map(highlight => `
                            <li><i class="fas fa-check"></i> ${highlight}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="event-testimonial">
                    <h3><i class="fas fa-comment"></i> Отзыв клиента:</h3>
                    <blockquote>
                        "${data.testimonial}"
                        <cite>- ${data.client}</cite>
                    </blockquote>
                </div>
            </div>
        </div>
    `;

    // Открываем модальное окно
    modal.classList.add('active');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Добавляем обработчики для миниатюр
    initGalleryThumbnails();

    // Добавляем обработчик закрытия
    const closeModalBtn = modal.querySelector('.modal-close');
    if (closeModalBtn) {
        closeModalBtn.onclick = closePortfolioModal;
    }

    // Закрытие по клику на overlay
    modalOverlay.onclick = closePortfolioModal;

    // Закрытие по ESC
    document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия модального окна
function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    const modalOverlay = document.querySelector('.modal-overlay');

    if (modal) modal.classList.remove('active');
    if (modalOverlay) modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';

    document.removeEventListener('keydown', handleEscClose);
}

// Обработчик ESC для закрытия
function handleEscClose(e) {
    if (e.key === 'Escape') {
        closePortfolioModal();
    }
}

// Инициализация миниатюр галереи
function initGalleryThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');

    if (!thumbnails.length || !mainImage) return;

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            // Удаляем активный класс у всех миниатюр
            thumbnails.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс текущей миниатюре
            this.classList.add('active');
            // Меняем главное изображение
            const newImage = this.getAttribute('data-image');
            mainImage.src = newImage;

            // Анимация смены изображения
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 200);
        });
    });
}

// Слайдер отзывов
function initTestimonialsSlider() {
    console.log('Initializing testimonials slider...');

    const testimonialsSlider = document.querySelector('.testimonials-slider');

    if (!testimonialsSlider) {
        console.warn('Testimonials slider not found');
        return;
    }

    try {
        const swiper = new Swiper(testimonialsSlider, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                }
            }
        });

        console.log('Testimonials slider initialized');
    } catch (error) {
        console.error('Error initializing Swiper:', error);
    }
}

// Анимация счетчиков статистики
function initStatsCounter() {
    console.log('Initializing stats counter...');

    const statNumbers = document.querySelectorAll('.stat-number');

    if (!statNumbers.length) {
        console.warn('Stat numbers not found');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const suffix = statNumber.textContent.replace(/\d+/g, '');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current) + suffix;
                }, 16);

                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));

    console.log('Stats counter initialized');
}

// Кнопка "Загрузить еще"
function initLoadMore() {
    console.log('Initializing load more...');

    const loadMoreBtn = document.getElementById('loadMore');
    const portfolioGrid = document.getElementById('portfolioGrid');

    if (!loadMoreBtn || !portfolioGrid) {
        console.warn('Load more elements not found');
        return;
    }

    let currentItems = 8;
    let itemCounter = 9;

    loadMoreBtn.addEventListener('click', function () {
        console.log('Load more clicked');

        // Имитация загрузки новых элементов
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
        this.disabled = true;

        setTimeout(() => {
            // Добавляем новые элементы
            for (let i = 0; i < 4; i++) {
                const newItem = createPortfolioItem(itemCounter);
                portfolioGrid.appendChild(newItem);
                itemCounter++;
            }

            currentItems += 4;

            // Обновляем обработчики для новых элементов
            reinitModalButtons();

            // Возвращаем исходный вид кнопки
            this.innerHTML = '<i class="fas fa-sync-alt"></i> Загрузить ещё мероприятия';
            this.disabled = false;

            // Если достигли максимума, скрываем кнопку
            if (currentItems >= 20) {
                this.style.display = 'none';
            }

            console.log('Loaded 4 more items, total:', currentItems);
        }, 1000);
    });

    console.log('Load more initialized');
}

// Создание элемента портфолио
function createPortfolioItem(index) {
    const categories = [
        { name: 'wedding', icon: 'heart', text: 'Свадьба' },
        { name: 'corporate', icon: 'briefcase', text: 'Корпоратив' },
        { name: 'anniversary', icon: 'birthday-cake', text: 'Юбилей' },
        { name: 'birthday', icon: 'gift', text: 'День рождения' },
        { name: 'other', icon: 'glass-cheers', text: 'Другое' }
    ];

    const category = categories[Math.floor(Math.random() * categories.length)];
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const month = months[Math.floor(Math.random() * months.length)];
    const years = ['2022', '2021', '2020'];
    const year = years[Math.floor(Math.random() * years.length)];

    const item = document.createElement('div');
    item.className = `portfolio-item ${category.name}`;
    item.style.animationDelay = `${(index % 8) * 0.1}s`;
    item.innerHTML = `
        <div class="portfolio-card">
            <div class="portfolio-image">
                <img src="https://images.unsplash.com/photo-${1500000 + index}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Мероприятие ${index}">
                <div class="portfolio-overlay">
                    <span class="portfolio-category">${category.text}</span>
                    <span class="portfolio-date">${month} ${year}</span>
                </div>
            </div>
            <div class="portfolio-content">
                <h3>Мероприятие ${index}</h3>
                <p class="portfolio-location">Москва</p>
                <p class="portfolio-description">Еще одно прекрасное мероприятие, организованное с душой и профессионализмом. Каждый праздник уникален и запоминается надолго.</p>
                <div class="portfolio-features">
                    <span><i class="fas fa-users"></i> ${Math.floor(Math.random() * 200) + 50} гостей</span>
                    <span><i class="fas fa-clock"></i> ${Math.floor(Math.random() * 6) + 3} часов</span>
                </div>
                <button class="btn-view-details" data-item="${index}">
                    <i class="fas fa-expand"></i> Подробнее
                </button>
            </div>
        </div>
    `;

    return item;
}

// Переинициализация кнопок модального окна
function reinitModalButtons() {
    const newButtons = document.querySelectorAll('.portfolio-item:not(.initialized) .btn-view-details');

    newButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const itemId = this.getAttribute('data-item');
            console.log('New button clicked for item:', itemId);

            // Для новых элементов показываем данные первого элемента
            const data = portfolioData[1] || portfolioData[1];

            if (data) {
                openPortfolioModal(data);
            }
        });

        button.closest('.portfolio-item').classList.add('initialized');
    });
}

// Анимация плавающих фотографий
function initFloatingAnimation() {
    console.log('Initializing floating animation...');

    const photos = document.querySelectorAll('.floating-photo');

    if (!photos.length) {
        console.warn('Floating photos not found');
        return;
    }

    photos.forEach((photo, index) => {
        const randomDelay = Math.random() * 5;
        const randomDuration = 15 + Math.random() * 10;

        photo.style.animationDelay = `${randomDelay}s`;
        photo.style.animationDuration = `${randomDuration}s`;
    });

    console.log('Floating animation initialized');
}

// Дебаг функция для проверки
function debugPortfolio() {
    console.log('=== PORTFOLIO DEBUG ===');
    console.log('View buttons:', document.querySelectorAll('.btn-view-details').length);
    console.log('Portfolio items:', document.querySelectorAll('.portfolio-item').length);
    console.log('Modal:', document.getElementById('portfolioModal'));
    console.log('Modal overlay:', document.querySelector('.modal-overlay'));
    console.log('Filter buttons:', document.querySelectorAll('.filter-tab').length);
    console.log('=======================');
}

// Запускаем дебаг
setTimeout(debugPortfolio, 1000);