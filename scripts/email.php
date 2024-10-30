<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Replace with your actual email address
    $to = "your-email@example.com";
    $subject = "New Contact Form Submission";

    // Collect and sanitize the input data
    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $formSubject = filter_var($_POST["subject"], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);

    // Construct the email body
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Subject: $formSubject\n\n";
    $body .= "Message:\n$message\n";

    // Set email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email and check for success
    if (mail($to, $subject, $body, $headers)) {
        // Redirect or show a success message
        header("Location: ../thankyou.html");
        exit;
    } else {
        echo "There was an error sending your message. Please try again later.";
    }
} else {
    // Redirect to contact form if accessed directly
    header("Location: ../contact.html");
    exit;
}
?>
