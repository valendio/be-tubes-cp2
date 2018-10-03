

const domain = require('../../../../../../bin/modules/mockup/repositories/commands/domain');
const command = require('../../../../../../bin/modules/mockup/repositories/commands/command');
const eventPublisher = require('../../../../../../bin/helpers/events/event_publisher');
const sinon = require('sinon');
const assert = require('assert');

describe('Add new mockup', () => {

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

  it('Should return mockup object', async () => {

    sinon.stub(command, 'insertOneMockupEventStore').returns(queryResult);

    const mockup = new domain();
    const rs = await mockup.addNewMockup(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.domainName, 'Test');

    command.insertOneMockupEventStore.restore();
  });

  it('Should return mockup object with empty project name', async () => {

    payload = {
      domainName: 'Test',
      apiName: 'Test',
      mockup: 'test'
    };

    queryResult = {
      err: null,
      data: {
        projectName: '',
        domainName: 'Test',
        apiName: 'Test',
        mockup: 'test',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Has Been Processed',
      code: 200
    };

    sinon.stub(command, 'insertOneMockupEventStore').returns(queryResult);

    const mockup = new domain();
    const rs = await mockup.addNewMockup(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.projectName, '');

    command.insertOneMockupEventStore.restore();
  });

  it('Should return mockup object with empty domain name', async () => {

    payload = {
      projectName: 'Test',
      apiName: 'Test',
      mockup: 'test'
    };

    queryResult = {
      err: null,
      data: {
        projectName: 'Test',
        domainName: '',
        apiName: 'Test',
        mockup: 'test',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Has Been Processed',
      code: 200
    };

    sinon.stub(command, 'insertOneMockupEventStore').returns(queryResult);

    const mockup = new domain();
    const rs = await mockup.addNewMockup(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.domainName, '');

    command.insertOneMockupEventStore.restore();
  });

  it('Should return mockup object with empty api name', async () => {

    payload = {
      domainName: 'Test',
      projectName: 'Test',
      mockup: 'test'
    };

    queryResult = {
      err: null,
      data: {
        projectName: 'Test',
        domainName: 'Test',
        apiName: '',
        mockup: 'test',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Has Been Processed',
      code: 200
    };

    sinon.stub(command, 'insertOneMockupEventStore').returns(queryResult);

    const mockup = new domain();
    const rs = await mockup.addNewMockup(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.apiName, '');

    command.insertOneMockupEventStore.restore();
  });

  it('Should return mockup object with empty mockup', async () => {

    payload = {
      domainName: 'Test',
      apiName: 'Test',
      projectName: 'Test'
    };

    queryResult = {
      err: null,
      data: {
        projectName: 'Test',
        domainName: 'Test',
        apiName: 'Test',
        mockup: '',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Has Been Processed',
      code: 200
    };

    sinon.stub(command, 'insertOneMockupEventStore').returns(queryResult);

    const mockup = new domain();
    const rs = await mockup.addNewMockup(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.mockup, '');

    command.insertOneMockupEventStore.restore();
  });



});

describe('Publish new mockup', () => {

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

  it('Should return mockup object', async () => {

    sinon.stub(eventPublisher.prototype, 'publishEvent').returns(queryResult);

    const mockup = new domain();
    const rs = await mockup.publishNewMockup(queryResult);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.domainName, 'Test');

    eventPublisher.prototype.publishEvent.restore();
  });

});
