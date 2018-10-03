

const Batch = require('../../../../../bin/helpers/workers/eventings/batch');
const EventPublisher = require('../../../../../bin/helpers/events/event_publisher');
const db = require('../../../../../bin/helpers/databases/mongodb/db');
const sinon = require('sinon');
const assert = require('assert');

describe('batchChecking', () => {

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

  it('It should run event batchChecking', async () => {
    sinon.stub(db.prototype, 'findOne').returns(queryResult);

    let batch = new Batch('','','','','test',0,0,0);
    batch.init();
    batch.batchChecking('');

    db.prototype.findOne.restore();
  });

  it('It should return error recordset in batchChecking', async () => {

    queryResult = {
      err: true,
      data: {
        projectName: 'Test',
        domainName: 'Test',
        apiName: 'Test',
        mockup: 'test',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Can not Processed',
      code: 500
    };

    sinon.stub(db.prototype, 'findOne').returns(queryResult);

    let batch = new Batch('','','','','test',0,0,0);
    batch.init();
    batch.batchChecking('');

    db.prototype.findOne.restore();
  });

  it('It should return error 404 recordset in batchChecking', async () => {

    queryResult = {
      err: true,
      data: {
        projectName: 'Test',
        domainName: 'Test',
        apiName: 'Test',
        mockup: 'test',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Can not Processed',
      code: 404
    };

    sinon.stub(db.prototype, 'findOne').returns(queryResult);
    sinon.stub(Batch.prototype, 'batchWriting');

    let batch = new Batch('','','','','test',0,0,0);
    batch.init();
    batch.batchChecking('');

    db.prototype.findOne.restore();
    Batch.prototype.batchWriting.restore();
  });

  it('It should return parameter writing', async () => {

    let recordset = {
      vBrandID : null
    };

    let batch = new Batch('','','','','test',0,0,0);
    batch.init();
    let rs = batch.getParameterWriting(recordset);

    assert.equal(rs.payload,recordset);
  });

});

describe('batchWriting', () => {

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

  let recordset = {
    vBrandID : null
  };

  it('It should run event batchWriting', async () => {
    sinon.stub(db.prototype, 'upsertOne').returns(queryResult);

    let batch = new Batch('','','','','test',0,0,0);
    batch.init();
    batch.batchWriting(recordset);

    db.prototype.upsertOne.restore();
  });

  it('It should run error result in batchWriting', async () => {
    queryResult = {
      err: true,
      data: {
        projectName: 'Test',
        domainName: 'Test',
        apiName: 'Test',
        mockup: 'test',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Can not Processed',
      code: 500
    };

    sinon.stub(db.prototype, 'upsertOne').returns(queryResult);

    let batch = new Batch('','','','','test',0,0,0);
    batch.init();
    batch.batchWriting(recordset);

    db.prototype.upsertOne.restore();
  });

  it('It should run result code 201 in batchWriting', async () => {
    queryResult = {
      err: null,
      data: {
        projectName: 'Test',
        domainName: 'Test',
        apiName: 'Test',
        mockup: 'test',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Can not Processed',
      code: 201
    };

    sinon.stub(db.prototype, 'upsertOne').returns(queryResult);

    let batch = new Batch('','','','','test',0,0,0);
    batch.init();
    batch.batchWriting(recordset);

    db.prototype.upsertOne.restore();
  });


});

describe('batchInsert', () => {

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

  let recordset = {
    vBrandID : 'brandId'
  };

  it('It should run batchInsert', async () => {

    sinon.stub(db.prototype, 'insertOne').returns(queryResult);

    let batch = new Batch('','','','','test',0,0,0);
    batch.init();
    batch.batchInsert(recordset);

    db.prototype.insertOne.restore();
  });

  it('It should return error result in batchInsert', async () => {

    queryResult = {
      err: true,
      data: {
        projectName: 'Test',
        domainName: 'Test',
        apiName: 'Test',
        mockup: 'test',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Can not Processed',
      code: 500
    };

    sinon.stub(db.prototype, 'insertOne').returns(queryResult);

    let batch = new Batch('','','','','test',0,1,1);
    batch.init();
    batch.batchInsert(recordset);

    db.prototype.insertOne.restore();
  });

});

describe('batchFindingObjectId', () => {
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

  let parameter = {
    vBrandID : 'brandId'
  };

  let nModified = 1;

  it('It should run batchFindingObjectId', async () => {

    sinon.stub(db.prototype, 'findOne').returns(queryResult);

    let batch = new Batch('','','','','test',0,0,0);
    batch.init();
    batch.batchFindingObjectId(parameter, nModified);

    db.prototype.findOne.restore();
  });

  it('It should return error recordset in batchFindingObjectId', async () => {

    queryResult = {
      err: true,
      data: {
        projectName: 'Test',
        domainName: 'Test',
        apiName: 'Test',
        mockup: 'test',
        _id: '5ac326f42ab53718edf9ea1c'
      },
      message: 'Your Request Can not Processed',
      code: 500
    };

    sinon.stub(db.prototype, 'findOne').returns(queryResult);

    let batch = new Batch('','','','','test',0,0,0);
    batch.init();
    batch.batchFindingObjectId(parameter, nModified);

    db.prototype.findOne.restore();
  });

});


describe('batchPublishing', () => {

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

  let nModified = 0;

  let record = {
    payload: ''
  };

  it('Should run batchPublishing', async () => {

    sinon.stub(db.prototype, 'upsertOne').returns(queryResult);
    sinon.stub(EventPublisher.prototype, 'getEventPayload').returns(record);
    sinon.stub(EventPublisher.prototype, 'publishEvent').returns(queryResult);
    // sinon.stub(EventPublisher.prototype, 'publishEventCore');

    let batch = new Batch('','','','','test',0,0,0);
    batch.init();
    batch.batchPublishing(queryResult, nModified);

    db.prototype.upsertOne.restore();
    EventPublisher.prototype.getEventPayload.restore();
    EventPublisher.prototype.publishEvent.restore();
    // EventPublisher.prototype.publishEventCore.restore();

  });

  it('Should return error recordset in batchPublishing', async () => {

    queryResult = {
      err: true,
      data: null,
      message: 'Your Request Can not Processed',
      code: 500
    };

    sinon.stub(db.prototype, 'upsertOne').returns(queryResult);
    sinon.stub(EventPublisher.prototype, 'getEventPayload').returns(record);
    sinon.stub(EventPublisher.prototype, 'publishEvent').returns(queryResult);
    // sinon.stub(EventPublisher.prototype, 'publishEventCore');

    let batch = new Batch('','','','','test',0,0,0);
    batch.init();
    batch.batchPublishing(queryResult, nModified);

    db.prototype.upsertOne.restore();
    EventPublisher.prototype.getEventPayload.restore();
    EventPublisher.prototype.publishEvent.restore();
    // EventPublisher.prototype.publishEventCore.restore();

  });

});
