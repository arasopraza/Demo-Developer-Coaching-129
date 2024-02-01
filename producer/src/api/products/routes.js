const routes = (handler) => [
  {
    method: 'POST',
    path: '/products',
    handler: handler.postProductHandler,
    config: {
      auth: 'product_app',
    }
  },
  {
    method: 'GET',
    path: '/products',
    handler: handler.getProductsHandler,
    config: {
      auth: 'product_app'
    }
  }
];

module.exports = routes;
