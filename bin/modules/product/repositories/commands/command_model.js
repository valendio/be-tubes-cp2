const joi = require('joi');

// const login = joi.object({
//   username: joi.string().required(),
//   password: joi.string().required(),
//   isActive : joi.boolean().default(true, 'Example If Need Default Value')
// });

const product = joi.object({
  name: joi.string().required(),
  categories: joi.string().required(),
  price: joi.string().required(),
  details: joi.string().required(),
  isActive: joi.boolean().default(true, "Example If Need Default Value"),
  id_categories: joi.number().required(),
});

module.exports = {
  product
};
