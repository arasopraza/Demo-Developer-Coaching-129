require('dotenv').config();
const amqp = require('amqplib');
const OrdersService = require('./OrdersService');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const init = async () => {
  const orderService = new OrdersService();
  const mailSender = new MailSender();
  const listener = new Listener(orderService, mailSender);

  // Todo 3
};

init();
