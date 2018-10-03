
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../infra/configs/global_config');
const userQuery = require('../modules/user/repositories/queries/query');
const wrapper = require('../helpers/utils/wrapper');

const getKey = keyPath => fs.readFileSync(keyPath, 'utf8');

const generateToken = async (payload) => {
  const privateKey = getKey(config.getPrivateKey());
  const verifyOptions = {
    algorithm: 'RS256',
    audience: '97b33193-43ff-4e58-9124-b3a9b9f72c34',
    issuer: 'telkomdev',
    expiresIn: '100m'
  };
  const token = jwt.sign(payload, privateKey, verifyOptions);
  return token;
};

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const verifyToken = async (req, res, next) => {
  const result = {
    data: null
  };
  const publicKey = getKey(config.getPublicKey());
  const verifyOptions = {
    algorithm: 'RS256',
    audience: '97b33193-43ff-4e58-9124-b3a9b9f72c34',
    issuer: 'telkomdev'
  };

  const token = getToken(req.headers);
  if (!token) {
    return wrapper.response(res, 'fail', result, 'Invalid token!', 403);
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, publicKey, verifyOptions);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return wrapper.response(res, 'fail', result, 'Access token expired!', 401);
    }
    return wrapper.response(res, 'fail', result, 'Token is not valid!', 401);
  }
  const userId = decodedToken.sub;
  const user = userQuery.findById(userId);
  if (user.err) {
    wrapper.response(res, 'fail', result, 'Invalid token!', 403);
  }
  req.userId = userId;
  next();
};

module.exports = {
  generateToken,
  verifyToken
};
