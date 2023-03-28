const ObjectId = require('mongodb').ObjectId;


class Command {
  constructor(db) {
    this.db = db;
  }

  async insertProduct(document){
    this.db.setCollection('product');
    const result = await this.db.insertOne(document);
    return result;
  }

  async updateOneProduct(id) {
    this.db.setCollection("product");
    const parameter = {
      _id: ObjectId(id)
    };
    const result = await this.db.updateOne(id);
    return result;
  }

  async deleteOneProduct(id) {
    this.db.setCollection('product');
    const parameter = {
      _id: ObjectId(id)
    };
    const result = await this.db.findByIdAndDelete(parameter);
    return result;
  }

}

module.exports = Command;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
