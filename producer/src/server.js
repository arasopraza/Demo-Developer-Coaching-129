// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();
const path = require('path');
const Inert = require('@hapi/inert');

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const hacli = require('@antoniogiordano/hacli');
const ClientError = require('./exceptions/ClientError');

// users
const users = require('./api/users');
const UsersService = require('./services/UsersService');

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');

// products
const products = require('./api/products');
const ProductsService = require('./services/ProductsService');
const StorageService = require('./services/StorageService');

// orders
const orders = require('./api/orders');
const OrdersService = require('./services/OrdersService');
const ProducerService = require('./services/ProducerService');

const init = async () => {
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const productsService = new ProductsService();
  const ordersService = new OrdersService();
  const storageService = new StorageService(path.resolve(__dirname, 'api/products/file/images'));

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    debug: {
      request: ['error']
    },
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // registrasi plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: hacli,
      options: {
        permissions: ['ADMIN', 'USER']
      }
    },
    {
      plugin: Inert,
    },
  ]);

  // mendefinisikan strategy autentikasi jwt
  server.auth.strategy('product_app', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
        permissions: artifacts.decoded.payload.role,
      },
    }),
  });


  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
      },
    },
    {
      plugin: products,
      options: {
        productService: productsService,
        storageService: storageService,
      }
    },
    {
      plugin: orders,
      options: {
        userService: usersService,
        orderService: ordersService,
        producerService: ProducerService,
      }
    }
  ]);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;
  
    // penanganan client error secara internal.
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
      
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
