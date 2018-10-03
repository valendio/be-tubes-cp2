
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  isValidPassword(password) {
    return this.password === password;
  }
}

module.exports.findByUsername = (username, cb) => {
  const userDatas = [{ username: 'telkom', password: 'da1c25d8-37c8-41b1-afe2-42dd4825bfea' }];
  let userData = '';

  userData = userDatas.map((value) => {
    if (value.username === username) {
      return value;
    }
    return '';
  });
  const user = new User(userData[0].username, userData[0].password);
  cb(user);
};
