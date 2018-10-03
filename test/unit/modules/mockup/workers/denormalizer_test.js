

const command = require('../../../../../bin/modules/mockup/repositories/commands/command');
const denormalizer = require('../../../../../bin/modules/mockup/workers/denormalizer');
const sinon = require('sinon');
const assert = require('assert');

describe('createOneMockupView', () => {

  let date = new Date();
  let payload = {
    projectName: 'Test',
    domainName: 'Test',
    apiName: 'Test',
    mockup: 'test',
    createdAt: date.toISOString(),
    createdBy: 'user',
    updatedAt: date.toISOString(),
    updatedBy: 'user'
  };

  let queryResult = {
    err: null,
    data: {
      projectName: 'Test',
      domainName: 'Test',
      apiName: 'Test',
      mockup: 'test',
      createdAt: date.toISOString(),
      createdBy: 'user',
      updatedAt: date.toISOString(),
      updatedBy: 'user',
      _id: '5ac326f42ab53718edf9ea1c'
    },
    message: 'Your Request Has Been Processed',
    code: 200
  };

  it('Should return denormalizer mockup object', async () => {

    sinon.stub(command, 'insertOneMockupView').returns(queryResult);

    const rs = await denormalizer.createOneMockupView(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.domainName, 'Test');
    assert.equal(rs.data.createdBy, 'user');

    command.insertOneMockupView.restore();
  });

  it('Should return denormalizer mockup object with empty createdAt', async () => {

    payload = {
      projectName: 'Test',
      domainName: 'Test',
      apiName: 'Test',
      mockup: 'test',
      createdBy: 'user',
      updatedAt: date.toISOString(),
      updatedBy: 'user'
    };

    queryResult = {
      err: null,
      data: {
        projectName: 'Test',
        domainName: 'Test',
        apiName: 'Test',
        mockup: 'test',
        createdAt: '',
        createdBy: 'user',
        updatedAt: date.toISOString(),
        updatedBy: 'user',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Has Been Processed',
      code: 200
    };

    sinon.stub(command, 'insertOneMockupView').returns(queryResult);

    const rs = await denormalizer.createOneMockupView(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.domainName, 'Test');
    assert.equal(rs.data.createdAt, '');

    command.insertOneMockupView.restore();
  });

  it('Should return denormalizer mockup object with empty createdAt', async () => {

    payload = {
      projectName: 'Test',
      domainName: 'Test',
      apiName: 'Test',
      mockup: 'test',
      createdBy: 'user',
      updatedAt: date.toISOString(),
      updatedBy: 'user'
    };

    queryResult = {
      err: null,
      data: {
        projectName: 'Test',
        domainName: 'Test',
        apiName: 'Test',
        mockup: 'test',
        createdAt: '',
        createdBy: 'user',
        updatedAt: date.toISOString(),
        updatedBy: 'user',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Has Been Processed',
      code: 200
    };

    sinon.stub(command, 'insertOneMockupView').returns(queryResult);

    const rs = await denormalizer.createOneMockupView(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.domainName, 'Test');
    assert.equal(rs.data.createdAt, '');

    command.insertOneMockupView.restore();
  });

  it('Should return denormalizer mockup object with empty createdBy', async () => {

    payload = {
      projectName: 'Test',
      domainName: 'Test',
      apiName: 'Test',
      mockup: 'test',
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      updatedBy: 'user'
    };

    queryResult = {
      err: null,
      data: {
        projectName: 'Test',
        domainName: 'Test',
        apiName: 'Test',
        mockup: 'test',
        createdAt: date.toISOString(),
        createdBy: '',
        updatedAt: date.toISOString(),
        updatedBy: 'user',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Has Been Processed',
      code: 200
    };

    sinon.stub(command, 'insertOneMockupView').returns(queryResult);

    const rs = await denormalizer.createOneMockupView(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.domainName, 'Test');
    assert.equal(rs.data.createdBy, '');

    command.insertOneMockupView.restore();
  });

  it('Should return denormalizer mockup object with empty updatedAt', async () => {

    payload = {
      projectName: 'Test',
      domainName: 'Test',
      apiName: 'Test',
      mockup: 'test',
      createdBy: 'user',
      createdAt: date.toISOString(),
      updatedBy: 'user'
    };

    queryResult = {
      err: null,
      data: {
        projectName: 'Test',
        domainName: 'Test',
        apiName: 'Test',
        mockup: 'test',
        createdAt: date.toISOString(),
        createdBy: 'user',
        updatedAt: '',
        updatedBy: 'user',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Has Been Processed',
      code: 200
    };

    sinon.stub(command, 'insertOneMockupView').returns(queryResult);

    const rs = await denormalizer.createOneMockupView(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.domainName, 'Test');
    assert.equal(rs.data.updatedAt, '');

    command.insertOneMockupView.restore();
  });

  it('Should return denormalizer mockup object with empty updatedBy', async () => {

    payload = {
      projectName: 'Test',
      domainName: 'Test',
      apiName: 'Test',
      mockup: 'test',
      createdAt: date.toISOString(),
      createdBy: 'user',
      updatedAt: date.toISOString()
    };

    queryResult = {
      err: null,
      data: {
        projectName: 'Test',
        domainName: 'Test',
        apiName: 'Test',
        mockup: 'test',
        createdAt: '',
        createdBy: 'user',
        updatedAt: date.toISOString(),
        updatedBy: '',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Has Been Processed',
      code: 200
    };

    sinon.stub(command, 'insertOneMockupView').returns(queryResult);

    const rs = await denormalizer.createOneMockupView(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.domainName, 'Test');
    assert.equal(rs.data.updatedBy, '');

    command.insertOneMockupView.restore();
  });

});
