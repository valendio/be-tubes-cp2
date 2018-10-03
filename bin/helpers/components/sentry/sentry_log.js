
const Raven = require('raven');
const config = require('../../../infra/configs/global_config');

const sendError = async (errorMessage) => {
  Raven.config(config.getSentryDSN()).install();
  Raven.captureException(errorMessage);
};

module.exports = {
  sendError
};
