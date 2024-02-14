/* eslint-disable camelcase */

exports.shorthands = undefined;
 
exports.up = (pgm) => {
  pgm.addColumn('products', {
    photo: {
      type: 'VARCHAR(255)',
    },
  });
};
 
exports.down = (pgm) => {
  pgm.dropColumn('products', 'photo');
};