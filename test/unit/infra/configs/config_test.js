

const nconf = require('nconf');
const config = require('../../../../bin/infra/configs/config');
const sinon = require('sinon');

describe('initEnvironments', () => {

  it('Should init environment', async () => {

    const envconf = {
      db : 'localhost'
    };

    sinon.stub(nconf.env(), 'file').resolves(envconf);
    sinon.stub(nconf, 'defaults');
    config.initEnvironments(nconf);

  });

});
