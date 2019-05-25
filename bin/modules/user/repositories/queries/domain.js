
const query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');

class User {

  async viewUser(userId) {
    const user = await query.findById(userId);
    if (user.err) {
      return wrapper.error('Can not find user');
    }
    const { data } = user;
    return wrapper.data(data);
  }

}

module.exports = User;
