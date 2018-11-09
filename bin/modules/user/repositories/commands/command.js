
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');

const insertOneMockupEventStore = async (document) => {
  const db = new Mongo(config.getDevelopmentDB());
  db.setCollection('mockup-event-store');
  const result = await db.insertOne(document);
  return result;
};

const insertOneMockupView = async (document) => {
  const db = new Mongo(config.getDevelopmentDB());
  db.setCollection('mockup-view');
  const result = await db.insertOne(document);
  return result;
};

module.exports = {
  insertOneMockupEventStore,
  insertOneMockupView
};
