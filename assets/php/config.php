<?php
// Конфигурация для отправки почты

// Основные настройки
define('SITE_NAME', 'TOP-WEDDING');
define('SITE_URL', 'https://top-wedding.tilda.ws/');

// Настройки почты
define('TO_EMAIL', 'valeria.dragnil877@gmail.com'); // Ваш email
define('FROM_EMAIL', 'no-reply@top-wedding.ru');
define('FROM_NAME', 'TOP-WEDDING Автоматическая рассылка');

// Настройки SMTP (если потребуется)
define('USE_SMTP', false); // Пока используем стандартную функцию mail()
define('SMTP_HOST', 'smtp.yandex.ru');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', '');
define('SMTP_PASSWORD', '');
define('SMTP_SECURE', 'tls');

// Другие настройки
define('MAX_FILE_SIZE', 5242880); // 5MB для загрузки файлов
define('ALLOWED_FILE_TYPES', ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx']);
?>