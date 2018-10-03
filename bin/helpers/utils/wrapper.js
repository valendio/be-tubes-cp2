
const data = (data, description = '', code = 200) => ({ err: null, data, message: description, code });

const paginationData = (data, meta, description = '', code = 200) => ({ err: null, data, meta, message: description, code });

const error = (err, description, code = 500) => ({ err, data: '', message: description, code });

const response = (res, type, result, message, code) => {
  /* eslint no-param-reassign: 2 */
  if (message) {
    result.message = message;
  }
  if (code) {
    result.code = code;
  }
  let status = false;
  switch (type) {
  case 'fail':
    status = false;
    break;
  case 'success':
    status = true;
    break;
  default:
    status = true;
    break;
  }
  res.send(result.code,
    {
      success: status,
      data: result.data,
      message: result.message,
      code: result.code
    });
};

const paginationResponse = (res, type, result, message = null, code = null) => {
  if (message) {
    result.message = message;
  }
  if (code) {
    result.code = code;
  }
  let status = 'error';
  switch (type) {
  case 'fail':
    status = 'fail';
    break;
  case 'success':
    status = 'success';
    break;
  default:
    status = true;
    break;
  }
  res.send(
    {
      status,
      data: result.data,
      meta: result.meta,
      code: result.code,
      message: result.message
    }
  );
};

module.exports = {
  data,
  paginationData,
  error,
  response,
  paginationResponse
};
