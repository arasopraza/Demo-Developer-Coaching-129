require('dotenv').config();
const amqp = require('amqplib');
const OrdersService = require('./OrdersService');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const init = async () => {
  const orderService = new OrdersService();
  const mailSender = new MailSender();
  const listener = new Listener(orderService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('order:confirm', {
    durable: true,
  });

  channel.consume('order:confirm', listener.listen, { noAck: true });
};

init();
