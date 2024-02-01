const handler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'orders',
  version: '1.0.0',
  register: async (server, { userService, orderService, producerService }) => {
    const ordersHandler = new handler(userService, orderService, producerService);
    server.route(routes(ordersHandler));
  },
};
