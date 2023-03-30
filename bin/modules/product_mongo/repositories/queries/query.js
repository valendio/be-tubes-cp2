const ObjectId = require("mongodb").ObjectId;

class Query {
  constructor(db) {
    this.db = db;
  }

  async findById(id) {
    this.db.setCollection("product");
    const parameter = {
      _id: ObjectId(id),
    };
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

  async findAll() {
    this.db.setCollection("product");
    const recordset = await this.db.findMany();
    return recordset;
  }

  // async findPagination(payload, size) {
  //  const limit = parseInt(size);
  //   const page = (payload - 1) * limit;
  //   // payload = (page - 1) * limit;

  //   this.db.setCollection("product");
  //   const recordset = await this.db.findAllData({}, limit, page );
  //   return recordset;
  // }

  async getPaginations(fieldName, row, page) {
    this.db.setCollection("product");
    const recordset = await this.db.findAllData(fieldName, row, page);
    return recordset;
  }
}

module.exports = Query;
