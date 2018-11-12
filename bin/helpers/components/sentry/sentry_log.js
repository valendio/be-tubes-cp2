const config = require('../../../infra/configs/global_config');
const Raven = require('raven');

const sendError = async (errorMessage) => {
  Raven.config(config.get('/dsnSentryUrl')).install();
  Raven.captureMessage(errorMessage);
};

module.exports = {
  sendError
};
