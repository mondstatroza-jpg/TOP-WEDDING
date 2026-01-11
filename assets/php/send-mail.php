<?php
// Включаем отображение ошибок для отладки
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Заголовки для JSON
header('Content-Type: application/json; charset=utf-8');

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не разрешен']);
    exit;
}

// Получаем данные из формы
$data = json_decode(file_get_contents('php://input'), true);

// Если данные пришли не в JSON формате, пробуем получить из POST
if (!$data) {
    $data = $_POST;
}

// Проверяем обязательные поля
$required_fields = ['name', 'phone', 'email', 'eventType', 'eventDate', 'agree'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        echo json_encode([
            'success' => false, 
            'message' => 'Пожалуйста, заполните все обязательные поля'
        ]);
        exit;
    }
}

// Очистка и валидация данных
$name = htmlspecialchars(trim($data['name']));
$phone = htmlspecialchars(trim($data['phone']));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$eventType = htmlspecialchars(trim($data['eventType']));
$eventDate = htmlspecialchars(trim($data['eventDate']));
$plan = isset($data['plan']) ? htmlspecialchars(trim($data['plan'])) : 'Не указан';
$guests = isset($data['guests']) ? htmlspecialchars(trim($data['guests'])) : 'Не указано';
$message = isset($data['message']) ? htmlspecialchars(trim($data['message'])) : 'Не указано';

// Валидация email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false, 
        'message' => 'Пожалуйста, введите корректный email'
    ]);
    exit;
}

// Email получателя (ВАШ email)
$to = 'valeria.dragnil877@gmail.com';
$subject = '🎉 Новая заявка с сайта TOP-WEDDING!';

// Заголовки письма
$headers = "From: TOP-WEDDING <no-reply@top-wedding.ru>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "MIME-Version: 1.0\r\n";

// Тело письма в HTML формате
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Новая заявка с сайта</title>
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 20px; 
            background-color: #f5f5f5;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 10px; 
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header { 
            background: linear-gradient(135deg, #D4AF37, #8A2BE2); 
            color: white; 
            padding: 30px 20px; 
            text-align: center;
        }
        .header h1 { 
            margin: 0; 
            font-size: 24px;
        }
        .content { 
            padding: 30px;
        }
        .field { 
            margin-bottom: 20px; 
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .field:last-child { 
            border-bottom: none;
        }
        .field-label { 
            font-weight: bold; 
            color: #D4AF37; 
            display: block; 
            margin-bottom: 5px;
            font-size: 14px;
        }
        .field-value { 
            font-size: 16px;
            color: #333;
        }
        .footer { 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 1px solid #ddd; 
            font-size: 12px; 
            color: #777; 
            text-align: center; 
            background: #f9f9f9;
            padding: 20px;
        }
        .highlight {
            background: linear-gradient(135deg, #D4AF37, #8A2BE2);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🎉 Новая заявка с сайта TOP-WEDDING!</h1>
            <p>Праздник начинается здесь!</p>
        </div>
        <div class='content'>
            
            <div class='highlight'>
                <div style='font-size: 20px;'>Заявка на тариф: <strong>$plan</strong></div>
            </div>
            
            <div class='field'>
                <span class='field-label'>👤 Имя клиента:</span>
                <span class='field-value'>$name</span>
            </div>
            
            <div class='field'>
                <span class='field-label'>📞 Телефон для связи:</span>
                <span class='field-value'>$phone</span>
            </div>
            
            <div class='field'>
                <span class='field-label'>📧 Email адрес:</span>
                <span class='field-value'>$email</span>
            </div>
            
            <div class='field'>
                <span class='field-label'>🎯 Тип мероприятия:</span>
                <span class='field-value'>$eventType</span>
            </div>
            
            <div class='field'>
                <span class='field-label'>📅 Дата мероприятия:</span>
                <span class='field-value'>$eventDate</span>
            </div>
            
            <div class='field'>
                <span class='field-label'>👥 Количество гостей:</span>
                <span class='field-value'>$guests</span>
            </div>
            
            <div class='field'>
                <span class='field-label'>📝 Дополнительная информация:</span>
                <span class='field-value'>$message</span>
            </div>
            
            <div class='field'>
                <span class='field-label'>🕒 Дата и время заявки:</span>
                <span class='field-value'>" . date('d.m.Y H:i:s') . "</span>
            </div>
            
            <div class='field'>
                <span class='field-label'>🌐 IP адрес:</span>
                <span class='field-value'>" . $_SERVER['REMOTE_ADDR'] . "</span>
            </div>
            
        </div>
        
        <div class='footer'>
            <p>📩 Это письмо было отправлено автоматически с формы заявки на сайте TOP-WEDDING</p>
            <p>Ссылка на сайт: https://top-wedding.tilda.ws/</p>
            <p>Не отвечайте на это письмо</p>
        </div>
    </div>
</body>
</html>";

// Пытаемся отправить письмо
try {
    if (mail($to, $subject, $email_body, $headers)) {
        // Логируем отправку в файл (для отладки)
        $log_message = date('Y-m-d H:i:s') . " - Успешная отправка заявки от $name ($email)\n";
        file_put_contents(__DIR__ . '/mail_log.txt', $log_message, FILE_APPEND);
        
        // Отправляем JSON ответ об успехе
        echo json_encode([
            'success' => true, 
            'message' => 'Заявка успешно отправлена! Я свяжусь с вами в ближайшее время.'
        ]);
    } else {
        // Логируем ошибку
        $error_message = date('Y-m-d H:i:s') . " - Ошибка отправки почты для $email\n";
        file_put_contents(__DIR__ . '/mail_errors.txt', $error_message, FILE_APPEND);
        
        echo json_encode([
            'success' => false, 
            'message' => 'Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.'
        ]);
    }
} catch (Exception $e) {
    // Логируем исключение
    $exception_message = date('Y-m-d H:i:s') . " - Исключение: " . $e->getMessage() . "\n";
    file_put_contents(__DIR__ . '/mail_exceptions.txt', $exception_message, FILE_APPEND);
    
    echo json_encode([
        'success' => false, 
        'message' => 'Произошла ошибка. Пожалуйста, свяжитесь с нами по телефону.'
    ]);
}
?>