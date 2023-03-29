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

  async updateOneProduct(id, payload) {
    this.db.setCollection("product");
    const parameter = ({
      _id: ObjectId(id)}, {$set: payload});
    const result = await this.db.upsertOne(parameter);
    return result;
  }

  async deleteOneProduct(id) {
    this.db.setCollection('product');
    const parameter = {
      _id: ObjectId(id)
    };
    const result = await this.db.deleteOne(parameter);
    return result;
  }

}

module.exports = Command;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
