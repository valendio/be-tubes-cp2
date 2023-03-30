const wrapper = require("../../../helpers/utils/wrapper");
const commandHandler = require("../repositories/commands/command_handler");
const commandModel = require("../repositories/commands/command_model");
const queryHandler = require("../repositories/queries/query_handler");
const validator = require("../utils/validator");
const {
  ERROR: httpError,
  SUCCESS: http,
} = require("../../../helpers/http-status/status_code");

const getAllProduct = async (req, res) => {
  const getData = (async) => queryHandler.getAllProduct();
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(
          res,
          "fail",
          result,
          "Get all Product",
          httpError.NOT_FOUND
        )
      : wrapper.response(res, "success", result, "Get all Product", http.OK);
  };
  sendResponse(await getData());
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const getData = (async) => queryHandler.getProductById(id);
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(
          res,
          "fail",
          result,
          "Get Product",
          httpError.NOT_FOUND
        )
      : wrapper.response(res, "success", result, "Get Product", http.OK);
  };
  sendResponse(await getData());
};

const createProduct = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(
    payload,
    commandModel.product
  );
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.insertProduct(result.data);
  };
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(
          res,
          "fail",
          result,
          "Insert Product",
          httpError.NOT_FOUND
        )
      : wrapper.response(res, "success", result, "Insert Product", http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const getData = (async) => commandHandler.deleteProduct(id);
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(
          res,
          "fail",
          result,
          "Product deleted successfully",
          httpError.NOT_FOUND
        )
      : wrapper.response(res, "success", result, "Delete Product", http.OK);
  };
  sendResponse(await getData());
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const getData = (async) => commandHandler.updateProduct(id);
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(
          res,
          "fail",
          result,
          "Product Update successfully",
          httpError.NOT_FOUND
        )
      : wrapper.response(res, "success", result, "Update Product", http.OK);
  };
  sendResponse(await getData());
};

// const pagination = async (req, res) => {
//   const page  = parseInt(req.query.page);
//   const size = parseInt(req.query.size);
//   const getData = async => queryHandler.getPagination(page,size);
//   const sendResponse = async (result) => {
//     result.err
//       ? wrapper.response(res, "fail", result, "Get Product Failed", httpError.NOT_FOUND)
//       : wrapper.response(res, "success", result, "Get Product", http.OK);
//   };
//   sendResponse(await getData())
// };

const pagination = async (req, res) => {
  const { page } = req.params;
  const getCommand = async () => queryHandler.getPagination(page);
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(
          res,
          "fail",
          result,
          "Get Films",
          httpError.INTERNAL_ERROR
        )
      : wrapper.response(res, "success", result, "Get Pagination", http.OK);
  };
  sendResponse(await getCommand());
};

module.exports = {
  getProductById,
  getAllProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  pagination,
};
