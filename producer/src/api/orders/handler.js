class ProductsHandler {
  constructor(userService, orderService, producerService) {
    this._userService = userService;
    this._orderService = orderService;
    this._producerService = producerService;

    this.postOrderHandler = this.postOrderHandler.bind(this);
    this.getOderssHandler = this.getOrdersHandler.bind(this);
  }

  async postOrderHandler(request, h) {
    const { productId, quantity, status } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const order = await this._orderService.addOrder({ userId: credentialId, productId, quantity, status });
    const userEmail = await this._userService.getUserById(credentialId)
    const message = {
      orderId: order,
      targetEmail: userEmail.email,
    };

    await this._producerService.sendMessage('order:confirm', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Order berhasil ditambahkan',
      data: {
        order,
      },
    });
    response.code(201);
    return response;
  }

  async getOrdersHandler(request, h) {
    const orders = await this._producerService.getAllProducts();
    return {
      status: 'success',
      data: {
        orders,
      },
    };
  }
}

module.exports = ProductsHandler;