const sinon = require('sinon');
const passport = require('passport');
const passportHttp = require('passport-http');
const basicAuth = require('../../../bin/auth/basic_auth_helper');
const authRepository = require('../../../bin/auth/auth_repository');

describe('Basic Auth', () => {
  describe('isAuthenticated', () => {
    it('Should return error user', () => {
      sinon.stub(authRepository, 'findByUsername').yields('', null);
      let basic = 'basic';
      let options = { session: false };
      sinon.stub(passportHttp, 'BasicStrategy');
      sinon.stub(passport, 'authenticate').callsFake((basic, options, callback) => {
        callback(null, { 'username': 'test@techbrij.com'}, null);
        // return (req,res,next)=>{};
      });
      //   basicAuth.init();
      basicAuth.isAuthenticated();
      authRepository.findByUsername.restore();
      passportHttp.BasicStrategy.prototype.restore();
    });
  });
});
