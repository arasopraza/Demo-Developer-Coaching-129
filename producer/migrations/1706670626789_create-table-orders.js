/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('orders', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    id_user: {
      type: 'VARCHAR(50)',
      references: 'users(id)',
      notNull: true,
      onDelete: 'CASCADE',
    },
    id_product: {
      type: 'VARCHAR(50)',
      references: 'products(id)',
      notNull: true,
      onDelete: 'CASCADE',
    },
    order_date: {
      type: 'timestamp',
      notNull: true,
    },
    quantity: {
      type: 'INTEGER',
    },
    status: {
      type: 'VARCHAR',
    }
  })
};

exports.down = pgm => { };
