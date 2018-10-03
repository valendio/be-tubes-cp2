

const db = require('../../../../../../bin/helpers/databases/mongodb/db');
const query = require('../../../../../../bin/modules/mockup/repositories/queries/query');
const sinon = require('sinon');
const assert = require('assert');

describe('findOneMockup', () => {

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
    apiName: 'Test'
  };

  it('Should view mockup object', async () => {

    sinon.stub(db.prototype, 'findOne').returns(queryResult);

    const rs = await query.findOneMockup(payload);

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data.domainName, 'Test');

    db.prototype.findOne.restore();
  });

});
