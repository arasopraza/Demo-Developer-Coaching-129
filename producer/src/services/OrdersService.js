const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');

class OrdersService {
  constructor() {
    this._pool = new Pool();
  }

  async addOrder({ userId, productId, quantity, status }) {
    const id = `order-${nanoid(16)}`;
    const orderDate = new Date().toISOString();
    const query = {
      text: 'INSERT INTO orders VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, userId, productId, orderDate, quantity, status],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Order gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getAllOrders() {
    const query = {
      text: 'SELECT * FROM orders',
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = OrdersService;
