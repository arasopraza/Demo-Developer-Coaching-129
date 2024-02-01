const { Pool } = require('pg');

class OrdersService {
  constructor() {
    this._pool = new Pool();
  }

  async getOrderById(id) {
    const query = {
      text: `select orders.id, orders.order_date, orders.quantity, orders.status,
          products."name", products.price_per_unit,
          users.email, users.username
          from orders
          join products on orders.id_product = products.id
          join users on orders.id_user = users.id
          where orders.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

module.exports = OrdersService;
