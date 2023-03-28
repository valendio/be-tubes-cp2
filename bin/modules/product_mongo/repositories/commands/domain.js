const Query = require("../queries/query");
const Command = require("./command");
const wrapper = require("../../../../helpers/utils/wrapper");
const logger = require("../../../../helpers/utils/logger");

class Product {
  constructor(db) {
    this.command = new Command(db);
    this.query = new Query(db);
  }
  async create(payload) {
    const ctx = "domain-postProduct";

    const result = await this.command.insertProduct(payload);
    if (result.err) {
      logger.log(ctx, "error", "error");
      return wrapper.error(new InternalServerError("Failed to insert product"));
    }
    return wrapper.data(result);
  }

  async delete(payload) {
    const { payload: result } = await this.command.deleteOneProduct(payload);
    return wrapper.data(result);
  }

  async update(payload) {
    const { payload: result } = await this.command.updateOneProduct(payload);
    return wrapper.data(result);
  }
}

module.exports = Product;
