
const ObjectId = require('mysql').ObjectId;



class Query {
  constructor(db) {
    this.db = db;
  }

  async findById(id) {
    const recordset = await this.db.prepareQuery('SELECT * FROM produk WHERE id = ?', id);
    return recordset;
  }

  async findByCategoryid(id_categories) {
    const recordset = await this.db.prepareQuery('SELECT * FROM produk WHERE id_categories = ?', id_categories);
    return recordset;

  }

  async Pagination(limit, offset) {
    const recordSet = await this.db.prepareQuery(
      "SELECT * FROM produk LIMIT ? OFFSET ?",
      [limit, offset]
    );
    return recordSet;
  }

  async findCount() {
    const recordSet = await this.db.prepareQuery(
      "SELECT COUNT(*) as total FROM produk"
    );
    return recordSet;
  }

  async findAll() {
    const recordset = await this.db.prepareQuery('SELECT * FROM produk ');
    return recordset;
    // this.db.setCollection('product')
    // const recordset = await this.db.findMany();
    // return recordset;
  }
}

// }

module.exports = Query;
