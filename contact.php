<?php
// Check if User Coming From A Request
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Assign Variables
        $user = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
        $mail = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $sub = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
        $msg  = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
        
     // Send The Email [ mail(To, Subject, Message, Headers, Parameters) ]
        
        $headers = 'From: ' . $mail . '\r\n';
        $myEmail = 'info@devaltsphere.com';
        $subject = 'Contact DEVALTSPHERE';
            mail($myEmail, $subject, $msg, $headers);
            $user = '';
            $mail = '';
            $sub  = '';
            $msg  = '';
            $success = '<div class="alert alert-success"><i class="fa fa-check"></i> Your Message was successfuly sent.</div>'; 

    }
?>
