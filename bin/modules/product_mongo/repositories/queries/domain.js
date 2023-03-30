
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');

class Product {
  constructor(db) {
    this.query = new Query(db);
  }

  async getAllProduct() {
    const product = await this.query.findAll();
    if (product.err) {
      return wrapper.error(new NotFoundError("Can not find Product"));
    }
    const { data } = product; 
    return wrapper.data(data);
  }

  async getProductById(id) {
    const product = await this.query.findById(id);
    if (product.err) {
      return wrapper.error(new NotFoundError("Can not find Product"));
    }
    const { data } = product;
    return wrapper.data(data);
  }

  async getPagination(page) {
    let fieldName = "page";
    let row = 5;
    const product = await this.query.getPaginations(fieldName, row, page);
    if (product.err) {
      return wrapper.error(new NotFoundError("Can not find product"));
    }
  }
}

module.exports = Product;
