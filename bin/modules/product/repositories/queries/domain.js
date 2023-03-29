
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');

class Product {
  constructor(db) {
    this.query = new Query(db);
  }

  // async viewUser(userId) {
  //   const user = await this.query.findById(userId);
  //   if (user.err) {
  //     return wrapper.error(new NotFoundError('Can not find user'));
  //   }
  //   const { data } = user;
  //   return wrapper.data(data);
  // }

  async getAllProduct() {
    const product = await this.query.findAll();
    if (product.err) {
      return wrapper.error(new NotFoundError("Can not find cart"));
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

  async getProductByIdCategories(id_categories) {
    const product = await this.query.findByCategoryid(id_categories);
    if (product.err) {
      return wrapper.error(new NotFoundError("Can not find Product"));
    }
    const { data } = product;
    return wrapper.data(data);
  }

  async pagination(payload) {
    const product = await this.query.Pagination(payload);

    // validation
    const { data } = product;
    return wrapper.data(data);
  }

  async viewCount() {
    const product = await this.query.findCount();

    // validation
    const { data } = product;
    return wrapper.data(data);
  }



}

module.exports = Product;
