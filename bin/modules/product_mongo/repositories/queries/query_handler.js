
const Product = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const product = new Product(db);

const getAllProduct = async () => {
  const getData = async () => {
    const result = await product.getAllProduct();
    return result;
  };
  const result = await getData();
  return result;
};

const getProductById = async (id) => {
  const getData = async () => {
    const result = await product.getProductById(id);
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  getAllProduct, getProductById
};
