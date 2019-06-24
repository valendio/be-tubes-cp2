
const data = (data) => ({ err: null, data});

const paginationData = (data, meta) => ({ err: null, data, meta});

const error = (err) => ({ err, data: null });

const response = (res, type, result, message = '', code = 200) => {
  let status = true;
  let data = result.data;
  if(type === 'fail'){
    status = false;
    data = '';
    message = result.err;
  }
  res.send(code,
    {
      success: status,
      data,
      message,
      code
    });
};

const paginationResponse = (res, type, result, message = '', code = 200) => {
  let status = true;
  let data = result.data;
  if(type === 'fail'){
    status = false;
    data = '';
    message = result.err;
  }
  res.send(code,
    {
      success: status,
      data,
      meta: result.meta,
      code,
      message
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
