const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendEmail(to, subject, text) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text
    });
  }
}

module.exports = new EmailService();
