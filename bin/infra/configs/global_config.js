
const nconf = require('nconf');

const getAuthAPI = () => nconf.get('AUTH_API_BASIC');

const getSentryDSN = () => nconf.get('DSN_SENTRY_URL');

const getDevelopmentDB = () => nconf.get('DEVELOPMENT_MONGO_DATABASE_URL');

const getDevelopmentDBMySQL = () => nconf.get('DEVELOPMENT_MYSQL_DATABASE_CONFIG');

const getMockupTopic = () => nconf.get('MOCKUP_TOPIC');

const getAWSCredential = () => nconf.get('AWS_CREDENTIAL');

const getPublicKey = () => nconf.get('PUBLIC_KEY_PATH');

const getPrivateKey = () => nconf.get('PRIVATE_KEY_PATH');

module.exports = {
  getAuthAPI,
  getSentryDSN,
  getDevelopmentDB,
  getDevelopmentDBMySQL,
  getMockupTopic,
  getAWSCredential,
  getPublicKey,
  getPrivateKey
};
