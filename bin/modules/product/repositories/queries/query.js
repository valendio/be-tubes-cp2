
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

  async Pagination(payload) {
    const page = (payload - 1) * 5

    const recordSet = await this.db.prepareQuery(
      `SELECT * FROM produk LIMIT 5 OFFSET ?`, 
      [page]
    )
    return recordSet
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
  }
}

// }

module.exports = Query;
