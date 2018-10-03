

const db = require('../../../../../../bin/helpers/databases/mongodb/db');
const command = require('../../../../../../bin/modules/mockup/repositories/commands/command');
const sinon = require('sinon');
const assert = require('assert');

describe('insertOneMockupEventStore', () => {

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

    sinon.stub(db.prototype, 'insertOne').returns(queryResult);

    const rs = await command.insertOneMockupEventStore(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.domainName, 'Test');

    db.prototype.insertOne.restore();

  });

});

describe('insertOneMockupView', () => {

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

  it('Should return view mockup object', async () => {

    sinon.stub(db.prototype, 'insertOne').returns(queryResult);

    const rs = await command.insertOneMockupView(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.domainName, 'Test');

    db.prototype.insertOne.restore();

  });

});
