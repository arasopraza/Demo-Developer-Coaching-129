const routes = (handler) => [
  {
    method: 'POST',
    path: '/orders',
    handler: handler.postOrderHandler,
    config: {
      auth: 'product_app',
    }
  },
  {
    method: 'GET',
    path: '/orders',
    handler: handler.getOrdersHandler,
    config: {
      auth: 'product_app'
    }
  }
];

module.exports = routes;
