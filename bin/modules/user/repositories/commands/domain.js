
const query = require('../queries/query');
const wrapper = require('../../../../helpers/utils/wrapper');
const jwtAuth = require('../../../../auth/jwt_auth_helper');
const commonUtil = require('../../../../helpers/utils/common');

const algorithm = 'aes-256-ctr';
const secretKey = 'Dom@in2018';

class User {

  async generateCredential(payload) {
    const { username, password } = payload;
    const user = await query.findOneUser({ username });
    if (user.err) {
      return wrapper.error('error', user.err, 409);
    }
    const userId = user.data._id;
    const userName = user.data.username;
    const pass = await commonUtil.decrypt(user.data.password, algorithm, secretKey);
    if (username !== userName || pass !== password) {
      return wrapper.error('error', 'Username or password invalid!', 409);
    }
    const data = {
      username,
      sub: userId
    };
    const token = await jwtAuth.generateToken(data);
    return wrapper.data(token, '', 200);
  }

}

module.exports = User;
