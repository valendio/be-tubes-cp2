class Command {
  constructor(db) {
    this.db = db;
  }

  // async insertCategory(document) {
  //   const { categoryName, isActive } = document;
  // }
  // async insertOneUser(document){
  //   this.db.setCollection('user');
  //   const result = await this.db.insertOne(document);
  //   return result;
  // }

  async insertProduct(document) {
    const { name, categories, price, details, isActive } = document;
    const result = await this.db.prepareQuery(
      "INSERT INTO produk (name, categories, price, details, isActive) VALUES (?,?,?,?,?)",
      [name, categories, price, details, isActive]
    );
    return result;
  }

  async updateOneProduct(document) {
    this.db.setCollection("product");
    const result = await this.db.updateOne(document);
    return result;
  }

  async deleteOneProduct(document) {
    this.db.setCollection("product");
    const result = await this.db.deleteOne(document);
    return result;
  }
}

module.exports = Command;
