const nodemailer = require('nodemailer');
require('dotenv').config();

// Gmail transporter for sending emails
// All admin notifications go to: nmajufavour16@gmail.com
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'nmajufavour16@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'lsnugsajlowrfury'
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
      from: `"Quantum Web3" <${process.env.EMAIL_USER || 'qfsw3ledger@gmail.com'}>`,
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