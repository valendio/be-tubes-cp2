const validate = require('validate.js');

const wrapper = require('../../utils/wrapper');
const conn = require('./connection');
const { ERROR } = require('../../http-status/status_code');

const beutifyResult = (payload) => {
  const { hits: { hits } } = payload;
  const result = hits.map(({ _source }) => (_source));
  return result;
};

const createIndex = async (config, payload) => {
  let esClient = await conn.getConnection(config);
  let result = new Promise((resolve, reject) => {
    esClient.indices.create(payload, (error, response, status) => {
      if (error) {
        reject(error);
      }
      resolve({
        response: response,
        status: status
      });
    });
  });
  return Promise.resolve(result)
    .then(res => wrapper.data(res.response, 'index crated', res.status))
    .catch(err => wrapper.error('fail', 'failed to create index', err.statusCode));
};

const getAllIndex = async (config, idx) => {
  let esClient = await conn.getConnection(config);
  let result = new Promise((resolve, reject) => {
    esClient.cat.indices({}, (error, response, status) => {
      if (error) {
        reject(error);
      }
      resolve({
        response: response,
        status: status
      });
    });
  });
  return Promise.resolve(result)
    .then(res => wrapper.data(res.response, 'index crated', res.status))
    .catch(err => wrapper.error('fail', 'failed to create index', err.statusCode));
};

const insertElastiSearch = async (config, payload) => {
  let esClient = await conn.getConnection(config);
  let result = new Promise((resolve, reject) => {
    esClient.index(payload, (error, response, status) => {
      if (error) {
        reject(error);
      }
      resolve({
        response: response,
        status: status
      });
    });
  });
  return Promise.resolve(result)
    .then(res => wrapper.data(res.response, 'index crated', res.status))
    .catch(err => wrapper.error('fail', 'failed to create index', err.statusCode));
};

const countData = async (config, payload) => {
  let esClient = await conn.getConnection(config);
  let result = new Promise((resolve, reject) => {
    esClient.count(payload, (error, response, status) => {
      if (error) {
        reject(error);
      }
      resolve({
        response: response,
        status: status
      });
    });
  });
  return Promise.resolve(result)
    .then(res => wrapper.data(res.response, 'Success Count data', res.status))
    .catch(err => wrapper.error('fail', 'failed to count data', err.statusCode));
};

const deleteData = async (config, payload) => {
  let esClient = await conn.getConnection(config);
  let result = new Promise((resolve, reject) => {
    esClient.delete(payload, (error, response, status) => {
      if (error) {
        reject(error);
      }
      resolve({
        response: response,
        status: status
      });
    });
  });
  return Promise.resolve(result)
    .then(res => wrapper.data(res.response, 'Success delete data', res.status))
    .catch(err => wrapper.error('fail', 'failed to delete data', err.statusCode));
};

const updateData = async (config, payload) => {
  const esClient = await conn.getConnection(config);
  const result = new Promise((resolve, reject) => {
    esClient.index(payload, (error, response, status) => {
      if (error) {
        reject(error);
      }
      resolve({
        response: response,
        status: status
      });
    });
  });
  return Promise.resolve(result)
    .then(res => wrapper.data(res.response, 'Success update data', res.status))
    .catch(err => wrapper.error('fail', 'failed to update data', err.statusCode));
};

const findOne = async (config, payload) => {
  const esClient = await conn.getConnection(config);
  const result = new Promise((resolve, reject) => {
    esClient.search(payload, (error, response, status) => {
      if (error) {
        reject(error);
      }
      resolve({
        response: response,
        status: status
      });
    });
  });
  return Promise.resolve(result)
    .then(res => {
      const data = beutifyResult(res.response).shift();
      if(validate.isEmpty(data)){
        return wrapper.error('fail', 'failed to find data', ERROR.NOT_FOUND);
      }
      return wrapper.data(data, 'Successfully find data', res.status);
    }).catch(err => {
      return wrapper.error('fail', 'failed to find data', err.statusCode);
    });
};

const findAll = async (config, payload) => {
  const esClient = await conn.getConnection(config);
  const result = new Promise((resolve, reject) => {
    esClient.search(payload, (error, response, status) => {
      if (error) {
        reject(error);
      }
      resolve({
        response: response,
        status: status
      });
    });
  });
  return Promise.resolve(result)
    .then(res => {
      const data = beutifyResult(res.response);
      if(validate.isEmpty(data)){
        return wrapper.data(data, 'Empty data', res.status);
      }
      return wrapper.data(data, 'Successfully find data', res.status);
    }).catch(err => {
      return wrapper.error('fail', 'failed to find data', err.statusCode);
    });
};

const insertMany = async (config, payload) => {
  let esClient = await conn.getConnection(config);
  let result = new Promise((resolve, reject) => {
    esClient.bulk(payload, (error, response, status) => {
      if (error) {
        reject(error);
      }
      resolve({
        response: response,
        status: status
      });
    });
  });
  return Promise.resolve(result)
    .then(res => wrapper.data(res.response, 'Successfully insert all data', res.status))
    .catch(err => wrapper.error('fail', 'failed to insert all data', err.statusCode));
};

const clearScroll = async (config, payload) => {
  let esClient = await conn.getConnection(config);
  let result = new Promise((resolve, reject) => {
    esClient.clearScroll(payload, (error, response, status) => {
      if (error) {
        reject(error);
      }
      resolve({
        response: response,
        status: status
      });
    });
  });
  return Promise.resolve(result)
    .then(res => wrapper.data(res.response, 'Successfully scroll data', res.status))
    .catch(err => wrapper.error('fail', 'failed to scroll data', err.statusCode));
};

const sugesters = async (config, payload) => {
  let esClient = await conn.getConnection(config);
  let result = new Promise((resolve, reject) => {
    esClient.search(payload, (error, response, status) => {
      if (error) {
        reject(error);
      }
      resolve({
        response: response,
        status: status
      });
    });
  });
  return Promise.resolve(result)
    .then(res => {
      const data = beutifyResult(res.response);
      return wrapper.data(data, 'Successfully find data', res.status);
    }).catch(err => {
      return wrapper.error('fail', 'failed to find data', err.statusCode);
    });
};

module.exports = {
  createIndex,
  getAllIndex,
  insertElastiSearch,
  countData,
  deleteData,
  updateData,
  findOne,
  findAll,
  insertMany,
  clearScroll,
  sugesters
};
