
const User = require('./domain');

const getUser = async (userId) => {
  const getData = async () => {
    const user = new User();
    const result = await user.viewUser(userId);
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  getUser
};
