class Command {
  constructor(db) {
    this.db = db;
  }

  async insertProduct(document) {
    const { name, categories, price, details, isActive, id_categories } = document;
    const result = await this.db.prepareQuery(
      "INSERT INTO produk (name, categories, price, details, isActive, id_categories) VALUES (?,?,?,?,?,?)",
      [name, categories, price, details, isActive, id_categories]
    );
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

  async updateOneProduct(id) {
    const result = await this.db.prepareQuery(
      "DELETE FROM product WHERE id = ?",id );
    return result;
    }


}

module.exports = Command;
