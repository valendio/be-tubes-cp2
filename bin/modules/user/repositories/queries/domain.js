
const query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { ERROR: httpError } = require('../../../../helpers/http-status/status_code');

class User {

  async viewUser(userId) {
    const user = await query.findById(userId);
    if (user.err) {
      return wrapper.error('error', 'Can not find user!', httpError.NOT_FOUND);
    }
    const { data } = user;
    return wrapper.data(data, '', 200);
  }

}

module.exports = User;
