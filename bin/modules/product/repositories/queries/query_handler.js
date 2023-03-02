
const Product = require('./domain');
const Mysql = require('../../../../helpers/databases/mysql/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mysql(config.get('/mysqlConfig'));
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
