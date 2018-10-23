const mysql = require('mysql');

let variableGlobal = [];

const createConnectionPool = async (config) => {
  const currConnection = variableGlobal.findIndex(conf => conf.config.toString() === config.toString());
  let db;
  if(currConnection === -1){
    db = await mysql.createPool(config);
    variableGlobal.push({
      config,
      connection: db
    });
  }
  return db;
};

const getConnection = async (config) => {
  const currConnection = variableGlobal.filter(conf => conf.config.toString() === config.toString());
  let conn;
  currConnection.map((obj,i) => {
    if(i === 0){
      const { connection } = obj;
      conn = connection;
    }
  });
  return conn;
};

module.exports = {
  createConnectionPool,
  getConnection
};
