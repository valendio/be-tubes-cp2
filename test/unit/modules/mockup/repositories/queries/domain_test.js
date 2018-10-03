

const domain = require('../../../../../../bin/modules/mockup/repositories/queries/domain');
const query = require('../../../../../../bin/modules/mockup/repositories/queries/query');
const sinon = require('sinon');
const assert = require('assert');

describe('viewOneMockup', () => {

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

  it('Should view mockup object', async () => {

    sinon.stub(query, 'findOneMockup').returns(queryResult);

    const mockup = new domain(payload);
    const rs = await mockup.viewOneMockup();

    assert.equal(rs.err, null);
    assert.equal(rs.code, 200);
    assert.equal(rs.data, 'test');

    query.findOneMockup.restore();
  });

  it('Should can not view mockup object', async () => {

    queryResult = {
      err: 'fail',
      data: null,
      message: 'Your Request can not be Processed',
      code: 500
    };

    sinon.stub(query, 'findOneMockup').returns(queryResult);

    const mockup = new domain(payload);
    const rs = await mockup.viewOneMockup();

    assert.equal(rs.err, 'fail');
    assert.equal(rs.code, 500);
    assert.equal(rs.data, null);

    query.findOneMockup.restore();
  });

});
