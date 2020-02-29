const Model = require('./mongo-model.js');
const ProductsSchema = require('./products-schema.js');

class Products extends Model {
  constructor() {
    super(ProductsSchema);
  }
}

module.exports = Products;