const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const jwtHelper = require('../../../bin/auth/jwt_auth_helper');

describe('Json Web Token', () => {

  beforeEach(() => {
    sinon.stub(fs, 'readFileSync');
    sinon.stub(jwt, 'sign');
  });

  afterEach(() => {
    fs.readFileSync.restore();
    jwt.sign.restore();
  });

  describe('generateToken', () => {
    it('should success generate token', async() => {
      await jwtHelper.generateToken({});
    });
  });

  describe('verifyToken', () => {
    it('should success verify token', async() => {
      const req = {
        headers: 'Bearer 12345'
      };
      const res = {
        send: sinon.stub()
      };
      const next = sinon.stub();
      sinon.stub(jwt, 'verify').rejects(new jwt.TokenExpiredError('error', new Date()));
      await jwtHelper.verifyToken(req, res, next);
    });
  });
});
