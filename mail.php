<?php

$method = $_SERVER['REQUEST_METHOD'];
$message = '';
$c = true;

if ($method === 'POST') {
    $data = $_POST;
} elseif ($method === 'GET') {
    $data = $_GET;
} else {
    exit("Invalid request method.");
}

// Nettoyage et récupération des champs principaux
$project_name  = trim($data["project_name"] ?? '');
$admin_email   = trim($data["admin_email"] ?? '');
$email_from    = trim($data["email_from"] ?? '');
$form_subject  = trim($data["form_subject"] ?? '');
$client_email  = trim($data["E-mail"] ?? '');

// Validation email du client
if (!filter_var($client_email, FILTER_VALIDATE_EMAIL)) {
    exit("Invalid client email address.");
}

// Construction du message HTML
foreach ($data as $key => $value) {
    if (
        $value !== '' &&
        !in_array($key, ["project_name", "admin_email", "email_from", "form_subject", "E-mail"])
    ) {
        $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
        $key = htmlspecialchars($key, ENT_QUOTES, 'UTF-8');
        $row_color = ($c = !$c) ? '' : ' style="background-color: #f8f8f8;"';

        $message .= "
        <tr{$row_color}>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
        </tr>
        ";
    }
}

$message = "<table style='width: 100%; border-collapse: collapse;'>$message</table>";

// Encodage UTF-8 du sujet et de l’expéditeur
function adopt($text) {
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

// En-têtes de l’email
$headers = "MIME-Version: 1.0" . PHP_EOL .
           "Content-Type: text/html; charset=utf-8" . PHP_EOL .
           'From: ' . adopt($project_name) . " <{$email_from}>" . PHP_EOL .
           "Reply-To: {$client_email}" . PHP_EOL;

// Envoi de l’email
mail($admin_email, adopt($form_subject), $message, $headers);
