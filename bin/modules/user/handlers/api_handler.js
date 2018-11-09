
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');

const postDataRegister = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.register);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.postDataRegister(payload);
  };
  const sendResponse = async (result) => {
    /* eslint no-unused-expressions: [2, { allowTernary: true }] */
    (result.err) ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, 'Register success');
  };
  sendResponse(await postRequest(validatePayload));
};

const postDataLogin = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.login);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.postDataLogin(payload);
  };
  const sendResponse = async (result) => {
    /* eslint no-unused-expressions: [2, { allowTernary: true }] */
    (result.err) ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, 'Login success');
  };
  sendResponse(await postRequest(validatePayload));
};

const getUser = async (req, res) => {
  const { userId } = req;
  const getData = async () => queryHandler.getUser(userId);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, 'Your Request Has Been Processed');
  };
  sendResponse(await getData());
};

const postDataUpdateUser = async (req, res) => {
  const postRequest = async (req) => {
    const payload = {
      userId: req.userId,
      body: req.body
    };
    return commandHandler.postDataUpdateUser(payload);
  };
  const sendResponse = async (result) => {
    /* eslint no-unused-expressions: [2, { allowTernary: true }] */
    (result.err) ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, 'Update user success');
  };
  sendResponse(await postRequest(req));
};

module.exports = {
  postDataRegister,
  postDataLogin,
  getUser,
  postDataUpdateUser
};
