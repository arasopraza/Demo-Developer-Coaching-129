class Listener {
  constructor(ordersService, mailSender) {
    this._ordersService = ordersService;
    this._mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { orderId, targetEmail } = JSON.parse(message.content.toString());
      const orderDetails = await this._ordersService.getOrderById(orderId);
      const data = {
        orderDetails
      };
      const result = await this._mailSender.sendEmail(targetEmail, data);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
