const joi = require('joi');

const login = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
});

module.exports = {
  login
};
