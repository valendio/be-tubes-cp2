
const query = require('../queries/query');
const wrapper = require('../../../../helpers/utils/wrapper');
const jwtAuth = require('../../../../auth/jwt_auth_helper');
const commonUtil = require('../../../../helpers/utils/common');
const logger = require('../../../../helpers/utils/logger');
const command = require('./command');
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
  async createUser(payload) {
    const ctx = 'domain-createUser';
    const { username, password } = payload;
    const checkUsername = await query.findOneUser({ username });
    if (!checkUsername.err) {
      logger.log(ctx, 'username already used', 'username already used');
      return wrapper.error('error', 'username already used', httpError.CONFLICT);
    }
    payload.password = await commonUtil.encrypt(password, algorithm, secretKey);
    const user = await command.insertOneUser(payload);
    if (user.err) {
      logger.log(ctx, user.err, 'fail to insert new data');
      return wrapper.error('error', user.err, httpError.INTERNAL_ERROR);
    }
    const userId = user.data._id;
    const data = {
      username,
      sub: userId
    };
    const token = await jwtAuth.generateToken(data);
    return wrapper.data(token, '', 200);
  }
  async updateUser(payload) {
    const ctx = 'domain-createUser';
    const { userId, body } = payload;
    let user = await query.findById(userId);
    if (user.err) {
      logger.log(ctx, user.err, 'user not found');
      return wrapper.error('error', user.err, httpError.NOT_FOUND);
    }
    const username = user.data.username;
    const bodyData = Object.keys(body);
    const updateUserData = await bodyData.map(key => {
      user.data[key] = body[key];
      return null;
    });
    await Promise.all(updateUserData);
    user = await command.updateOneUser({ username }, user.data);
    if (user.err) {
      logger.log(ctx, user.err, 'fail to update user');
      return wrapper.error('error', user.err, httpError.INTERNAL_ERROR);
    }
    return wrapper.data(user.data, '', 200);
  }

}

module.exports = User;
