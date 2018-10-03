

const commandHandler = require('../../../../../../bin/modules/mockup/repositories/commands/command_handler');
const domain = require('../../../../../../bin/modules/mockup/repositories/commands/domain');
const validator = require('../../../../../../bin/modules/mockup/utils/validator');
const sinon = require('sinon');
const assert = require('assert');

describe('postOneMockup', () => {

  let queryResult = {
    err: null,
    data: {
      projectName: 'Test',
      domainName: 'Test',
      apiName: 'Test',
      mockup: 'test',
      _id: '5ac326f42ab53718edf9ea1c'
    },
    message: 'Your Request Has Been Processed',
    code: 200
  };

  let payload = {
    projectName: 'Test',
    domainName: 'Test',
    apiName: 'Test',
    mockup: 'test'
  };

  it('Should return event store mockup object', async () => {

    sinon.stub(domain.prototype, 'addNewMockup').returns(queryResult);
    sinon.stub(domain.prototype, 'publishNewMockup').returns(queryResult);
    sinon.stub(validator, 'ifExistMockup').returns(queryResult);

    const rs = await commandHandler.postOneMockup(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.domainName, 'Test');

    domain.prototype.addNewMockup.restore();
    domain.prototype.publishNewMockup.restore();
    validator.ifExistMockup.restore();

  });

});
