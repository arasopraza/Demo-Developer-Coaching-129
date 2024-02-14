const ProductsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'products',
  version: '1.0.0',
  register: async (server, { productService, storageService }) => {
    const productsHandler = new ProductsHandler(productService, storageService);
    server.route(routes(productsHandler));
  },
};
