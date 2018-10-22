const mysql = require('mysql');

let variableGlobal = [];

const init = (config) => {
  createConnectionPool(config);
};

const createConnectionPool = async (config) => {
  const currConnection = variableGlobal.findIndex(conf => conf.config.toString() === config.toString());
  if(currConnection === -1){
    const db = mysql.createPool(config);
    variableGlobal.push({
      config,
      connection: db
    });
  }
};

const getConn = async (config) => {
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
  init,
  getConn
};
