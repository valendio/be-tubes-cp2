'use strict';

let userDatas = [
  {'username': 'telkom', 'password': 'da1c25d8-37c8-41b1-afe2-42dd4825bfea'}
];

class User {
  constructor(username, password){
    this.username = username;
    this.password = password;
  }

  isValidPassword(password){
    return this.password === password;
  }
}

module.exports.findByUsername = function(username, cb){
  let userData = '';
  for(let i=0;i<userDatas.length;i++){
    if(userDatas[i].username === username){
      userData = userDatas[i];
      break;
    }

  }
  let user =  new User(userData.username, userData.password);
  cb(user);
};
