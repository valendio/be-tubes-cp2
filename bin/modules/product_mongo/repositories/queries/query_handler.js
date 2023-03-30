const Product = require("./domain");
const Mongo = require("../../../../helpers/databases/mongodb/db");
const config = require("../../../../infra/configs/global_config");
const { async } = require("validate.js");
const db = new Mongo(config.get("/mongoDbUrl"));
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

// const getPagination = async (payload, page, size) => {
//   const getData = async () => {
//     const result = await product.getPagination(payload, page, size);
//     return result;
//   };
//   const result = await getData();
//   return result;
// };

const getPagination = async (page) => {
  const getData = async () => {
    const result = await product.getPagination(page);
    return result;
  };
};

module.exports = {
  getAllProduct,
  getProductById,
  getPagination,
};
