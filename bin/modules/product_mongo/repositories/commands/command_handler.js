// Import required modules
const Product = require("./domain");
const Mongo = require("../../../../helpers/databases/mongodb/db");
const Mysql = require("../../../../helpers/databases/mysql/db");
const config = require("../../../../infra/configs/global_config");
const db = new Mongo(config.get('/mongoDbUrl'));

// Function for inserting a product into the database
const insertProduct = async (payload) => {
  // Create a new product instance using the MySQL database
  const product = new Product(db);
  // Define a command to create a new product using the payload
  const postCommand = async (payload) => product.create(payload);
  // Execute the command and return the result
  return postCommand(payload);
};

// Function for deleting a product from the database
const deleteProduct = async (payload) => {
  // Create a new product instance using the MySQL database
  const product = new Product(db);
  // Define a command to delete a product using its ID
  const deleteCommand = async (payload) => product.delete(payload);
  // Execute the command and return the result
  return deleteCommand(payload);
};

const updateProduct = async (payload) => {
  const product = new Product(db);
  const updateCommand = async (payload) => product.update(payload);
  return updateCommand(payload);
};

// Export the functions
module.exports = {
  insertProduct,
  deleteProduct,
  updateProduct
};
