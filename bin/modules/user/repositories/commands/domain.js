
const query = require('../queries/query');
const command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const jwtAuth = require('../../../../auth/jwt_auth_helper');
const commonUtil = require('../../../../helpers/utils/common');
const logger = require('../../../../helpers/utils/logger');
const { ERROR: httpError } = require('../../../../helpers/http-error/custom_error');

const algorithm = 'aes-256-ctr';
const secretKey = 'Dom@in2018';

class User {

  async generateCredential(payload) {
    const ctx = 'domain-generateCredential';
    const { username, password } = payload;
    const user = await query.findOneUser({ username });
    if (user.err) {
      logger.log(ctx, user.err, 'user not found');
      return wrapper.error('error', user.err, httpError.NOT_FOUND);
    }
    const userId = user.data._id;
    const userName = user.data.username;
    const pass = await commonUtil.decrypt(user.data.password, algorithm, secretKey);
    if (username !== userName || pass !== password) {
      return wrapper.error('error', 'Username or password invalid!', httpError.UNAUTHORIZED);
    }
    const data = {
      username,
      sub: userId
    };
    const token = await jwtAuth.generateToken(data);
    return wrapper.data(token, '', 200);
  }

  async register(payload) {
    const { username, password, isActive } = payload;
    const user = await query.findOneUser({ username });

    if (user.data) {
      return wrapper.error('error', 'user already exist', httpError.CONFLICT);
    }

    const chiperPwd = await commonUtil.encrypt(password, algorithm, secretKey);
    const data = {
      username,
      password: chiperPwd,
      isActive
    };

    const { data:result } = await command.insertOneUser(data);
    return wrapper.data(result, 'register user successfull', 200);

  }

}

module.exports = User;
