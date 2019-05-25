
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const postDataLogin = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.login);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.postDataLogin(result.data);
  };
  const sendResponse = async (result) => {
    switch (result.err) {
    case 'user not found':
      wrapper.response(res, 'fail', result, 'Login User', httpError.NOT_FOUND);
      break;
    case 'Username or password invalid!':
      wrapper.response(res, 'fail', result, 'Login User', httpError.NOT_FOUND);
      break;
    default:
      wrapper.response(res, 'success', result, 'Login User', http.OK);
      break;
    }
  };
  sendResponse(await postRequest(validatePayload));
};

const getUser = async (req, res) => {
  const { userId } = req;
  const getData = async () => queryHandler.getUser(userId);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get User', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get User', http.OK);
  };
  sendResponse(await getData());
};

const registerUser = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.login);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.registerUser(result.data);
  };
  const sendResponse = async (result) => {
    /* eslint no-unused-expressions: [2, { allowTernary: true }] */
    (result.err) ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, 'Your Request Has Been Processed');
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  postDataLogin,
  getUser,
  registerUser
};
