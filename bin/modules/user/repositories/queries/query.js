
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const ObjectId = require('mongodb').ObjectId;

const findOneUser = async (parameter) => {
  const db = new Mongo(config.getDevelopmentDB());
  db.setCollection('user');
  const recordset = await db.findOne(parameter);
  return recordset;
};

const findById = async (id) => {
  const db = new Mongo(config.getDevelopmentDB());
  db.setCollection('user');
  const parameter = {
    _id: ObjectId(id)
  };
  const recordset = await db.findOne(parameter);
  return recordset;
};

module.exports = {
  findOneUser,
  findById
};
