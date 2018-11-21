
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');

const insertOneUser = async (document) => {
  const db = new Mongo(config.get('/mongoDbUrl'));
  db.setCollection('user');
  const result = await db.insertOne(document);
  return result;
};

module.exports = {
  insertOneUser
};
