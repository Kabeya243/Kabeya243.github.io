<?php

// Adresse email destinataire fixe
$admin_email = 'studio@kabeyailunga.com';

// Si le formulaire a été soumis en POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Nettoyage des données
    $name    = trim($_POST['Name'] ?? '');
    $email   = trim($_POST['E-mail'] ?? '');
    $phone   = trim($_POST['Phone'] ?? '');
    $message_content = trim($_POST['Message'] ?? '');

    // Sujet de l’email
    $subject = "New message from kabeyailunga.com";

    // Construction du message HTML
    $message = "
    <table style='width: 100%; border-collapse: collapse;'>
        <tr style='background-color: #f8f8f8;'>
            <td style='padding: 10px; border: 1px solid #e9e9e9;'><b>Name</b></td>
            <td style='padding: 10px; border: 1px solid #e9e9e9;'>$name</td>
        </tr>
        <tr>
            <td style='padding: 10px; border: 1px solid #e9e9e9;'><b>Email</b></td>
            <td style='padding: 10px; border: 1px solid #e9e9e9;'>$email</td>
        </tr>
        <tr style='background-color: #f8f8f8;'>
            <td style='padding: 10px; border: 1px solid #e9e9e9;'><b>Phone</b></td>
            <td style='padding: 10px; border: 1px solid #e9e9e9;'>$phone</td>
        </tr>
        <tr>
            <td style='padding: 10px; border: 1px solid #e9e9e9;'><b>Message</b></td>
            <td style='padding: 10px; border: 1px solid #e9e9e9;'>$message_content</td>
        </tr>
    </table>
    ";

    // Encodage UTF-8 du sujet
    $encoded_subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

    // Entêtes de l’email
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Envoi de l’email
    mail($admin_email, $encoded_subject, $message, $headers);
}
