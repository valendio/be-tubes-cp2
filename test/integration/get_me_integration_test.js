const assert = require('assert');
const sinon = require('sinon');
const hippie = require('hippie');
const jwt = require('jsonwebtoken');
const config = require('../../bin/infra/configs/global_config');
const user = require('../../bin/modules/user/repositories/queries/domain');
const db = require('../../bin/helpers/databases/mongodb/db');
const AppServer = require('../../bin/app/server');

describe('Get Me', () => {

  let appServer;
  const publicKey = 'public.pem';

  let result = {
    'success': true,
    'data': {
      '_id': '5bac53b45ea76b1e9bd58e1c',
      'username': 'alifsndev',
      'password': '8789ad457ac341e4fc4cad32'
    },
    'message': 'Your Request Has Been Processed',
    'code': 200
  };

  let queryResult = {
    'err': null,
    'data': {
      '_id': '5bac53b45ea76b1e9bd58e1c',
      'username': 'alifsndev',
      'password': '8789ad457ac341e4fc4cad32'
    },
    'message': 'Your Request Has Been Processed',
    'code': 200
  };

  let decodedToken = {
    'username': 'alifsn',
    'sub': '5bac53b45ea76b1e9bd58e1c',
    'iat': 1540469257,
    'exp': 1540475257,
    'aud': '97b33193-43ff-4e58-9124-b3a9b9f72c34',
    'iss': 'telkomdev'
  };

  beforeEach(function () {
    appServer = new AppServer();
    this.server = appServer.server;
    sinon.stub(config, 'getPublicKey').resolves(publicKey);
    sinon.stub(jwt, 'verify').resolves(decodedToken);
  });

  afterEach(function () {
    this.server.close();
    config.getPublicKey.restore();
    jwt.verify.restore();
  });

  it('Should error when view user for /api/v1/me', function (done) {

    hippie(this.server)
      .header('authorization','')
      .get('/api/v1/me')
      .expectStatus(403)
      .end((err, res, body) => {
        if(err){
          throw err;
        }
        done();
      });
  });

  it('Should return data for /api/v1/me', function (done) {

    sinon.stub(db.prototype, 'findOne').resolves(result);
    sinon.stub(user.prototype, 'viewUser').resolves(result);

    hippie(this.server)
      .header('authorization', 'Bearer dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==')
      .get('/api/v1/me')
      .expectStatus(200)
      .end((err, res, body) => {

        if(err){
          throw err;
        }

        let obj = JSON.parse(body);
        assert.equal(obj.status, result.status);
        assert.equal(obj.data.username, result.data.username);

        db.prototype.findOne.restore();
        user.prototype.viewUser.restore();
        done();
      });
  });

  it('Should return no data for /api/v1/me', function (done) {

    result = {
      'success': false,
      'data': null,
      'message': 'Your Request Failed to Process',
      'code': 500
    };

    queryResult = {
      'err': true,
      'data': null,
      'message': 'Your Request Failed to Process',
      'code': 500
    };

    sinon.stub(db.prototype, 'findOne').resolves(queryResult);
    sinon.stub(user.prototype, 'viewUser').resolves(result);

    hippie(this.server)
      .header('authorization', 'Bearer dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==')
      .get('/api/v1/me')
      .expectStatus(500)
      .end((err, res, body) => {

        if(err){
          throw err;
        }

        const result = JSON.parse(body);
        assert.equal(result.code, 500);
        assert.equal(result.data, null);

        db.prototype.findOne.restore();
        user.prototype.viewUser.restore();
        done();
      });
  });

});
