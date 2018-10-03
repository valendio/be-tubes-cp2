

const nconf = require('nconf');
const globalConfig = require('../../../../bin/infra/configs/global_config');
const sinon = require('sinon');
const assert = require('assert');

describe('getAuthAPI', () => {

  it('Should return authentication API config', async () => {

    sinon.stub(nconf, 'get').resolves('string config');

    let rs = await globalConfig.getAuthAPI();
    assert.notEqual(rs, null);

    nconf.get.restore();

  });

});

describe('getSentryDSN', () => {

  it('Should return sentry DSN config', async () => {

    sinon.stub(nconf, 'get').resolves('string config');

    let rs = await globalConfig.getSentryDSN();
    assert.notEqual(rs, null);

    nconf.get.restore();

  });

});

describe('getAWSCredential', () => {

  it('Should return AWS Credential config', async () => {

    sinon.stub(nconf, 'get').resolves('string config');

    let rs = await globalConfig.getAWSCredential();
    assert.notEqual(rs, null);

    nconf.get.restore();

  });

});

