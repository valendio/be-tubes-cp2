
const assert = require('assert');
const sinon = require('sinon');
const hippie = require('hippie');
const mockup = require('../../bin/modules/mockup/repositories/queries/domain');
const db = require('../../bin/helpers/databases/mongodb/db');
const AppServer = require('../../bin/app/server');

describe('Get Mockup', () => {

  let appServer;
  const projectName = 'Test';
  const domainName = 'Test';
  const apiName = 'Test';

  let result = {
    'success': true,
    'data': 'test',
    'message': 'Your Request Has Been Processed',
    'code': 200
  };

  let queryResult = {
    'id' : '',
    'projectName' : 'Test',
    'domainName' : 'Test',
    'apiName' : 'Test',
    'mockup' : 'test',
    'createdAt' : '',
    'createdBy' : '',
    'updatedAt' : '',
    'updatedBy' : ''
  };

  beforeEach(function () {
    appServer = new AppServer();
    this.server = appServer.server;
  });

  afterEach(function () {
    this.server.close();
  });

  it(`Should error view list bumn for /api/v1/mockups/${projectName}/${domainName}/${apiName}`, function (done) {
    hippie(this.server)
      .get(`/api/v1/mockups/${projectName}/${domainName}/${apiName}`)
      .expectStatus(401)
      .end(done);
  });

  it(`Should return data for /api/v1/mockups/${projectName}/${domainName}/${apiName}`, function (done) {

    sinon.stub(db.prototype, 'findOne').resolves(queryResult);
    sinon.stub(mockup.prototype, 'viewOneMockup').resolves(result);

    hippie(this.server)
      .header('authorization', 'Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==')
      .get(`/api/v1/mockups/${projectName}/${domainName}/${apiName}`)
      .expectStatus(200)
      .end((err, res, body) => {

        if(err){
          throw err;
        }

        let obj = JSON.parse(body);
        assert.equal(obj.status, result.status);
        assert.equal(obj.data, result.data);

        db.prototype.findOne.restore();
        mockup.prototype.viewOneMockup.restore();
        done();
      });
  });

  it(`Should return no data for /api/v1/mockups/${projectName}/${domainName}/${apiName}`, function (done) {

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
    sinon.stub(mockup.prototype, 'viewOneMockup').resolves(result);

    hippie(this.server)
      .header('authorization', 'Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==')
      .get(`/api/v1/mockups/${projectName}/${domainName}/${apiName}`)
      .expectStatus(500)
      .end((err, res, body) => {

        if(err){
          throw err;
        }

        const result = JSON.parse(body);
        assert.equal(result.code, 500);
        assert.equal(result.data, null);

        db.prototype.findOne.restore();
        mockup.prototype.viewOneMockup.restore();
        done();
      });
  });

});
