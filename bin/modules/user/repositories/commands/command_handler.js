
const User = require('./domain');

const postDataLogin = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.generateCredential(payload);
  return postCommand(payload);
};

const registerUser = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.register(payload);
  return postCommand(payload);
};

module.exports = {
  postDataLogin,
  registerUser
};
