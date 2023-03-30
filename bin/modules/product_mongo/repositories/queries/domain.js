const Query = require("./query");
const wrapper = require("../../../../helpers/utils/wrapper");
const { NotFoundError } = require("../../../../helpers/error");

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

  // async getPagination(payload, page, size) {
  //   const ctx = "domain-getPagination"
  //   const product = await this.query.findPagination(payload, page, size);

  //   // if (product.err) {
  //   //   loggers.log(ctx, "Can not find Product", "Error");
  //   //   return wrapper.error(new NotFoundError("Can not find Product"));
  //   // }
  //   // validation
  //   const { data } = product;
  //   return wrapper.data(data);
  // }

  async getPagination(page) {
    let fieldName = "page";
    let row = 5;
    const product = await this.query.getPaginations(fieldName, row, page);
    if (product.err) {
      return wrapper.error(new NotFoundError("Can not find product"));
    }
    const { data } = product;
    return wrapper.data(data);
  }

  // async findFilms(page) {
  //   let fieldName = "judul";
  //   let row = 5;
  //   const film = await this.query.findFilms(fieldName, row, page);
  //   if (film.err) {
  //     return wrapper.error(new NotFoundError("Can not find Film"));
  //   }
  //   const { data } = film;
  //   return wrapper.data(data);
  // }
}

module.exports = Product;
