
const ObjectId = require('mysql').ObjectId;

// class Query {

  // constructor(db) {
  //   this.db = db;
  // }

  // async findOneUser(parameter) {
  //   this.db.setCollection('user');
  //   const recordset = await this.db.findOne(parameter);
  //   return recordset;
  // }

  // async findById(id) {
  //   this.db.setCollection('user');
  //   const parameter = {
  //     _id: ObjectId(id)
  //   };
  //   const recordset = await this.db.findOne(parameter);
  //   return recordset;
  // }

  // query buat tugas

class Query {
  constructor(db) {
    this.db = db;
  }

  async findById(id) {
    const recordset = await this.db.prepareQuery('SELECT * FROM produk WHERE id = ?', id);
    return recordset;
    // this.db.setCollection('product');
    // const parameter = {
    //   _id: ObjectId(id)
    // };
    // const recordset = await this.db.findOne(parameter);
    // return recordset;
  }

  // async findByCategory(category) {
  //   const recordset = await this.db.prepareQuery('SELECT * FROM produk WHERE id = ?', category);
  //   return recordset;
  //   // this.db.setCollection('product');
  //   // const parameter = {
  //   //   _id: ObjectId(id)
  //   // };
  //   // const recordset = await this.db.findOne(parameter);
  //   // return recordset;
  // }

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
