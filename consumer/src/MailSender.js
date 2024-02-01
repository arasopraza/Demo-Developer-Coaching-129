const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const emailTemplate = `
      Dear ${content.orderDetails.username},

      Thank you for your order! Here are the details of your purchase:

      Order ID: ${content.orderDetails.id}
      Order Date: ${content.orderDetails.order_date}
      Product: ${content.orderDetails.name}
      Quantity: ${content.orderDetails.quantity}
      Status: ${content.orderDetails.status}

      If you have any questions or concerns, please contact us.

      Best regards,
      Ecommerce App
    `;

    const message = {
      from: 'Ecommerce Apps',
      to: targetEmail,
      subject: 'Order Confirmation',
      text: emailTemplate
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
