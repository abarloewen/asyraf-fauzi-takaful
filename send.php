<?php
/* =====================================================================
   Hj. Asyraf Fauzi — website form handler (booking + contact)
   Emails every submission to your Hostinger mailbox.

   >>> AFTER you create your mailbox in Hostinger, edit the 3 lines below <<<
   ===================================================================== */
$TO    = "booking@YOURDOMAIN.com";     // where submissions are delivered (your Hostinger inbox)
$FROM  = "no-reply@YOURDOMAIN.com";    // MUST be an address on YOUR domain (for deliverability)
$BRAND = "Hj. Asyraf Fauzi Website";   // sender name shown in your inbox
/* ===================================================================== */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405); echo json_encode(["ok"=>false,"error"=>"method"]); exit;
}

// Honeypot: real users never fill the hidden "company" field — drop bots silently.
if (!empty($_POST['company'])) { echo json_encode(["ok"=>true]); exit; }

function field($k){
  if (!isset($_POST[$k])) return '';
  $v = is_string($_POST[$k]) ? $_POST[$k] : '';
  $v = preg_replace('/[\r\n]+/', ' ', $v);   // strip header-injection chars
  return trim(mb_substr($v, 0, 1500));
}

$type    = field('type') ?: 'contact';
$name    = field('name');
$email   = field('email');
$phone   = field('phone');
$message = field('message');
$service = field('service');
$meeting = field('meeting');
$date    = field('date');
$time    = field('time');
$lang    = field('lang');

// Minimal validation: need a name + at least one way to reply.
if ($name === '' || ($email === '' && $phone === '')) {
  http_response_code(422); echo json_encode(["ok"=>false,"error"=>"missing"]); exit;
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422); echo json_encode(["ok"=>false,"error"=>"email"]); exit;
}

$subject = ($type === 'booking' ? "New booking request" : "New website message") . " — " . $name;

$pairs = [
  "Type"     => $type,
  "Name"     => $name,
  "Email"    => $email,
  "Phone"    => $phone,
  "Service"  => $service,
  "Meeting"  => $meeting,
  "Date"     => $date,
  "Time"     => $time,
  "Message"  => $message,
  "Language" => $lang,
  "When"     => date("Y-m-d H:i"),
];
$body = "New {$type} from your website:\n\n";
foreach ($pairs as $k => $v) { if ($v !== '') $body .= sprintf("%-9s %s\n", $k.":", $v); }
$body .= "\n— Sent automatically from your website form.";

$headers  = "From: ".mb_encode_mimeheader($BRAND)." <{$FROM}>\r\n";
if ($email !== '') $headers .= "Reply-To: ".mb_encode_mimeheader($name)." <{$email}>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$encodedSubject = "=?UTF-8?B?".base64_encode($subject)."?=";

$sent = @mail($TO, $encodedSubject, $body, $headers, "-f{$FROM}");

if ($sent) { echo json_encode(["ok"=>true]); }
else { http_response_code(500); echo json_encode(["ok"=>false,"error"=>"send"]); }
