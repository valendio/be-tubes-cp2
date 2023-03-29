const ObjectId = require("mongodb").ObjectId;

class Query {
  constructor(db) {
    this.db = db;
  }

  async findOneFilm(parameter) {
    this.db.setCollection("film");
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

  async findFilms() {
    this.db.setCollection("film");
    const recordset = await this.db.find();
    return recordset;
  }

  async addFilm(film) {
    this.db.setCollection("film");
    const newFilm = await this.db.insertOne(film);
    return newFilm;
  }

  async updateFilm(id, updates) {
    this.db.setCollection("film");
    const filter = {
      _id: ObjectId(id),
    };
    const updatedFilm = await this.db.updateOne(filter, updates);
    return updatedFilm;
  }

  async deleteFilm(id) {
    this.db.setCollection("film");
    const filter = {
      _id: ObjectId(id),
    };
    const deletedFilm = await this.db.deleteOne(filter);
    return deletedFilm;
  }
}

module.exports = Query;


