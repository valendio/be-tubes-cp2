const validate = require('validate.js');
const wrapper = require('../../utils/wrapper');
const pool = require('./connection');

class DB {
  constructor(config) {
    this.config = config;
  }

  done(connection) {
    connection.release();
  }

  createConnection() {
    pool.init(this.config);
  }

  async query(statement) {
    const self = this;
    let db = await pool.getConn(this.config);
    if(validate.isEmpty(db)){
      this.createConnection();
      db = await pool.getConn(this.config);
    }
    const recordset = () => {
      return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
          if (err) {
            let errorMessage;
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
              errorMessage = 'Database connection was closed.';
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
              errorMessage = 'Database has too many connections.';
            }
            if (err.code === 'ECONNREFUSED') {
              errorMessage = 'Database connection was refused.';
            }
            self.done(connection);
            reject(wrapper.error(err.code, errorMessage, 503));
          }

          connection.query(statement, (err, result) => {
            if (err) {
              self.done(connection);
              reject(wrapper.error(err.code, err.message, 503));
            }

            self.done(connection);
            resolve(wrapper.data(JSON.stringify(result)));

          });

        });
      });
    };
    const result = await recordset().then(result => {
      return wrapper.data(result);
    }).catch(err => {
      return err;
    });
    return result;
  }

}

module.exports = DB;
