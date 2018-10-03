
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const queryHandler = require('../repositories/queries/query_handler');

const postDataLogin = async (req, res, next) => {
  const payload = req.body;
  const postRequest = async () => commandHandler.postDataLogin(payload);
  const sendResponse = async (result) => {
    /* eslint no-unused-expressions: [2, { allowTernary: true }] */
    (result.err) ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, 'Your Request Has Been Processed');
  };
  sendResponse(await postRequest());
};

const getUser = async (req, res, next) => {
  const { userId } = req;
  const getData = async () => queryHandler.getUser(userId);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, 'Your Request Has Been Processed');
  };
  sendResponse(await getData());
};

module.exports = {
  postDataLogin,
  getUser
};
