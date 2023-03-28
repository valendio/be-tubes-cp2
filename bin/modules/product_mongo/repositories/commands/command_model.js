const joi = require('joi');

const product = joi.object({
  name: joi.string().required(),
  categories: joi.string().required(),
  price: joi.string().required(),
  details: joi.string().required(),
  isActive: joi.boolean().default(true, "Example If Need Default Value"),
});

module.exports = {
  product
};
