// utils/sendEmail.js
import nodemailer from "nodemailer";

export default async function sendEmail(to, subject, text) {
  try {
    // Create a transporter using your email service
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com", // or your SMTP provider
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS, // your email password or app password
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"Albania WorkConnect" <${process.env.EMAIL_USER}>`, // sender name + email
      to, // recipient
      subject, // subject line
      text, // plain text body
      // You can also add HTML if you want a styled email:
      html: `<p>${text}</p>`,
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw new Error("Email could not be sent");
  }
}