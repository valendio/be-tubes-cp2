
const query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');

class User {

  async viewUser(userId) {
    const user = await query.findById(userId);
    const { data } = user;
    if (user.err) {
      return wrapper.error('error', 'Can not find user!', 404);
    }
    return wrapper.data(data, '', 200);
  }

}

module.exports = User;
