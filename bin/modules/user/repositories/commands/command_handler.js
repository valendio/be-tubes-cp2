
const User = require('./domain');

const postDataRegister = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.createUser(payload);
  return postCommand(payload);
};
const postDataLogin = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.generateCredential(payload);
  return postCommand(payload);
};

const postDataUpdateUser = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.updateUser(payload);
  return postCommand(payload);
};

module.exports = {
  postDataRegister,
  postDataLogin,
  postDataUpdateUser
};
