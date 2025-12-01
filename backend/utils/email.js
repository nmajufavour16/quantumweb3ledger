const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Configure your email service here
  // Example for Gmail:
  service: 'gmail',
  auth: {
    user: 'nmajufavour16@gmail.com',
    pass: 'bhhuwouguigteuit'
  }
});

var transporterr = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,  // Standard SSL/TLS port
  secure: true,  // Use SSL/TLS
  auth: {
    user: 'support@qfsbestsecure.site',
    pass: 'Donkay101$'
  },
  ssl: {
    // SSL configuration
    rejectUnauthorized: true,
    minVersion: 'TLSv1.2'
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: 'support@qfsbestsecure.site',
      to,
      subject,
      html
    });
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Error sending email');
  }
};

module.exports = sendEmail;