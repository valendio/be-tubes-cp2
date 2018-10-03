

const eventHandler = require('../../../../../bin/modules/mockup/handlers/event_handler');
const denormalizer = require('../../../../../bin/modules/mockup/workers/denormalizer');
const sinon = require('sinon');

describe('mockupCreatedHandler', () => {

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

  it('Should create mockup view object', async () => {

    sinon.stub(denormalizer, 'createOneMockupView').returns(queryResult);

    await eventHandler.mockupCreatedHandler(payload);

    denormalizer.createOneMockupView.restore();
  });

});
