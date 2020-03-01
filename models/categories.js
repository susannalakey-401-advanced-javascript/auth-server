const Model = require('./mongo-model.js');
const CategoriesSchema = require('./categories-schema.js');

class Categories extends Model {
  constructor() {
    super(CategoriesSchema);
  }
}


module.exports = Categories;