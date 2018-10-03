
const User = require('./domain');

const postDataLogin = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.generateCredential(payload);
  return postCommand(payload);
};

module.exports = {
  postDataLogin
};
