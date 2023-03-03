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
    const { name, categories, price, details, isActive, id_categories } = document;
    const result = await this.db.prepareQuery(
      "INSERT INTO produk (name, categories, price, details, isActive, id_categories) VALUES (?,?,?,?,?,?)",
      [name, categories, price, details, isActive, id_categories]
    );
    return result;
  }

  async updateOneProduct(document) {
    this.db.setCollection("product");
    const result = await this.db.updateOne(document);
    return result;
  }

  async deleteOneProduct(id) {
    const result = await this.db.prepareQuery("DELETE FROM produk WHERE id = ?", id);
    return result;
  }

  
 async updateOneProduct(document, id) {
  const { name, categories, price, details, id_categories } = document;
  const result = await this.db.prepareQuery(
    "UPDATE produk SET name = ?, categories = ?, price = ?, details = ?, id_categories = ? WHERE id = ?",
    [name, categories, price, details, id_categories, id]
  );
  return result;
}
}

module.exports = Command;
