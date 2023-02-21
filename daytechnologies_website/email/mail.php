<?php

$filenameee =  $_FILES['file']['name'];
$fileName = $_FILES['file']['tmp_name'];
$name = $_POST['name'];
$email = $_POST['email'];
$usersubject = $_POST['subject'];
$usermessage = $_POST['message'];

$message = '<html><body>';
$message .= "<br><strong>Name</strong> = " . $name;
$message .=  "<br><strong>Email</strong> = " . $email;
$message .=  "<br><strong>Subject</strong> = " . $usersubject;
$message .=  "<br><strong>Message</strong> = " . $usermessage;
$message .= '</body></html>';

$subject = "New Message Received from : " . $name;
$fromname = "DAY Technologies";
$fromemail = 'noreply@daytechnologies.in';  //if u dont have an email create one on your cpanel

$mailto = 'info@daytechnologies.in';  //the email which u want to recv this email


$content = file_get_contents($fileName);
$content = chunk_split(base64_encode($content));

// a random hash will be necessary to send mixed content
$separator = md5(time());

// carriage return type (RFC)
$eol = "\r\n";

// main header (multipart mandatory)
$headers = "From: " . $fromname . " <" . $fromemail . ">" . $eol;
$headers .= "MIME-Version: 1.0" . $eol;
$headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol;
$headers .= "Content-Transfer-Encoding: 7bit" . $eol;
$headers .= "This is a MIME encoded message." . $eol;

// message
$body = "--" . $separator . $eol;
$body .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$body .= "Content-Transfer-Encoding: 8bit" . $eol;
$body .= $message . $eol;

if ($filenameee) {
    // attachment
    $body .= "--" . $separator . $eol;
    $body .= "Content-Type: application/octet-stream; name=\"" . $filenameee . "\"" . $eol;
    $body .= "Content-Transfer-Encoding: base64" . $eol;
    $body .= "Content-Disposition: attachment" . $eol;
    $body .= $content . $eol;
    $body .= "--" . $separator . "--";
}
//SEND Mail
if (mail($mailto, $subject, $body, $headers)) {
    echo "OK";
    http_response_code(200); // do what you want after sending the email

} else {
    echo "mail send ... ERROR!";
    print_r(error_get_last());
}
// $usersubject = $_POST['subject']; = $_POST['subject'];

// $message = "Name : " . $name . "\r\n  Email : " . $email . "\r\n Subject : ". $usersubject = $_POST['subject'];. "\r\n Message : " . $usermessage . "\r\n Subject : ". $usersubject = $_POST['subject'];;