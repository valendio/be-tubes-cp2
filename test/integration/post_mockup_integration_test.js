

const hippie = require('hippie');
const AppServer = require('../../bin/app/server');
const assert = require('assert');
const sinon = require('sinon');
const commandHandler = require('../../bin/modules/mockup/repositories/commands/command_handler');

describe('Post Mockup', () => {

  let appServer;

  let payload = {
    projectName: 'Test',
    domainName: 'Test',
    apiName: 'Test',
    mockup: 'test'
  };

  let result = {
    success: true,
    data: {
      projectName: 'Test',
      domainName: 'Test',
      apiName: 'Test',
      mockup: 'test',
      _id: '5ac326f42ab53718edf9ea1c'
    },
    message: 'Your Request Has Been Processed',
    code: 201
  };

  beforeEach(function () {
    appServer = new AppServer();
    this.server = appServer.server;
  });

  afterEach(function () {
    this.server.close();
  });

  it('Should error when post data for /api/v1/mockups/', function (done) {
    hippie(this.server)
      .post('/api/v1/mockups/')
      .send()
      .expectStatus(401)
      .end(done);
  });

  it('Should return posted data for /api/v1/mockups/', function (done) {

    sinon.stub(commandHandler, 'postOneMockup').resolves(result);

    /* eslint handle-callback-err: ["error", "error"] */
    hippie(this.server)
      .header('authorization','Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==')
      .json()
      .post('/api/v1/mockups/')
      .send(payload)
      .expectStatus(201)
      .end((err, res, body) => {
        assert.equal(body.data.domainName, 'Test');
        assert.equal(body.code, 201);

        commandHandler.postOneMockup.restore();
        done();
      });
  });

});
