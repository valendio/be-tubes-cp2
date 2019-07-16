const hippie = require('hippie');

const AppServer = require('../../bin/app/server');

describe('Root', () => {
  let appServer;

  beforeEach(function () {
    appServer = new AppServer();
    this.server = appServer.server;
  });

  afterEach(function () {
    this.server.close();
  });

  it('Should error when view user for /api/v1/me', function (done) {

    hippie(this.server)
      .get('/')
      .expectStatus(200)
      .end((err, res, body) => {
        if(err){
          throw err;
        }
        done();
      });
  });
});
