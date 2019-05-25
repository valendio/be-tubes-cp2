
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');

class User {

  constructor(db){
    this.query = new Query(db);
  }

  async viewUser(userId) {
    const user = await this.query.findById(userId);
    if (user.err) {
      return wrapper.error('Can not find user');
    }
    const { data } = user;
    return wrapper.data(data);
  }

}

module.exports = User;
