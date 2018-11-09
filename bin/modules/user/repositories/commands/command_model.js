const joi = require('joi');

const register = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  phoneNumber: joi.number().required(),
  username: joi.string().required(),
  password: joi.string().required()
});

const login = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
});

module.exports = {
  register,
  login
};
