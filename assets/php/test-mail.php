<?php
// Тестовый файл для проверки отправки почты
echo "<h1>Тест отправки почты</h1>";

// Проверяем функцию mail()
if (function_exists('mail')) {
    echo "<p style='color: green;'>✓ Функция mail() доступна</p>";
    
    // Тестовая отправка
    $to = "valeria.dragnil877@gmail.com";
    $subject = "Тестовая отправка с сайта";
    $message = "Это тестовое письмо от " . date('Y-m-d H:i:s');
    $headers = "From: test@top-wedding.ru\r\n";
    
    if (mail($to, $subject, $message, $headers)) {
        echo "<p style='color: green;'>✓ Тестовое письмо отправлено на $to</p>";
    } else {
        echo "<p style='color: red;'>✗ Ошибка при отправке тестового письма</p>";
    }
} else {
    echo "<p style='color: red;'>✗ Функция mail() недоступна</p>";
}

// Проверяем права на запись
$log_file = __DIR__ . '/assets/php/mail_log.txt';
if (is_writable(dirname($log_file))) {
    echo "<p style='color: green;'>✓ Папка для логов доступна для записи</p>";
} else {
    echo "<p style='color: red;'>✗ Папка для логов недоступна для записи</p>";
}

// Выводим информацию о сервере
echo "<h2>Информация о сервере:</h2>";
echo "<pre>";
echo "PHP Version: " . phpversion() . "\n";
echo "Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "\n";
echo "SMTP: " . ini_get('SMTP') . "\n";
echo "smtp_port: " . ini_get('smtp_port') . "\n";
echo "sendmail_from: " . ini_get('sendmail_from') . "\n";
echo "</pre>";

// Проверяем доступность SMTP
echo "<h2>Проверка SMTP:</h2>";
$smtp_host = 'smtp.yandex.ru';
$smtp_port = 587;
$connection = @fsockopen($smtp_host, $smtp_port, $errno, $errstr, 10);
if ($connection) {
    echo "<p style='color: green;'>✓ SMTP сервер $smtp_host:$smtp_port доступен</p>";
    fclose($connection);
} else {
    echo "<p style='color: orange;'>⚠ SMTP сервер $smtp_host:$smtp_port недоступен: $errstr ($errno)</p>";
}
?>