const nodemailer = require('nodemailer');
require('dotenv').config();

// Gmail transporter for sending emails
// All admin notifications go to: qfsw3ledger@gmail.com
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send email function
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - Email HTML content
 */
const sendEmail = async (to, subject, html) => {
  try {
    const emailConfig = {
      from: `"QFS Ledger" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(emailConfig);
    console.log('✅ Email sent successfully to:', to);
    return info;
  } catch (error) {
    console.error('❌ Email error:', error);
    throw new Error(`Error sending email: ${error.message}`);
  }
};

module.exports = sendEmail;