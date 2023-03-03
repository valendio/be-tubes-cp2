const wrapper = require("../../../helpers/utils/wrapper");
const commandHandler = require("../repositories/commands/command_handler");
const commandModel = require("../repositories/commands/command_model");
const queryHandler = require("../repositories/queries/query_handler");
const validator = require("../utils/validator");
const {
  ERROR: httpError,
  SUCCESS: http,
} = require("../../../helpers/http-status/status_code");

// const postDataLogin = async (req, res) => {
//   const payload = req.body;
//   const validatePayload = validator.isValidPayload(payload, commandModel.login);
//   const postRequest = async (result) => {
//     if (result.err) {
//       return result;
//     }
//     return commandHandler.postDataLogin(result.data);
//   };

//   const sendResponse = async (result) => {
//     (result.err) ? wrapper.response(res, 'fail', result, 'Login User')
//       : wrapper.response(res, 'success', result, 'Login User', http.OK);
//   };
//   sendResponse(await postRequest(validatePayload));
// };

// const getUser = async (req, res) => {
//   const { userId } = req;
//   const getData = async () => queryHandler.getUser(userId);
//   const sendResponse = async (result) => {
//     (result.err) ? wrapper.response(res, 'fail', result, 'Get User', httpError.NOT_FOUND)
//       : wrapper.response(res, 'success', result, 'Get User', http.OK);
//   };
//   sendResponse(await getData());
// };

// const registerUser = async (req, res) => {
//   const payload = req.body;
//   const validatePayload = validator.isValidPayload(payload, commandModel.login);
//   const postRequest = async (result) => {
//     if (result.err) {
//       return result;
//     }
//     return commandHandler.registerUser(result.data);
//   };
//   const sendResponse = async (result) => {
//     /* eslint no-unused-expressions: [2, { allowTernary: true }] */
//     (result.err) ? wrapper.response(res, 'fail', result, 'Register User', httpError.CONFLICT)
//       : wrapper.response(res, 'success', result, 'Register User', http.OK);
//   };
//   sendResponse(await postRequest(validatePayload));
// };

const getAllProducts = async (req, res) => {
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
          "Get Product by ID",
          httpError.NOT_FOUND
        )
      : wrapper.response(res, "success", result, "Get Product", http.OK);
  };
  sendResponse(await getData());
};

const getProductByIdCategories = async (req, res) => {
  const { id_categories } = req.params;
  const getData = (async) => queryHandler.getProductByIdCategories(id_categories);
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(
          res,
          "fail",
          result,
          "Get Product by Category",
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

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  getProductByIdCategories,
  deleteProduct
};
