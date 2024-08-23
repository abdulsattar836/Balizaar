const Joi = require("joi");

const productValidationSchema = Joi.object({
  // vendorId: Joi.string().required(),
  ProductImage: Joi.array().items(Joi.string().required()).required(),
  ProductName: Joi.string().required(),
  Listingtype: Joi.boolean().required(),
  OpenForOffer: Joi.boolean().default(true),
  WhereToMeet: Joi.boolean().default(true),
  AddLocation: Joi.string().required(),
  Price: Joi.number().required(),
  Description: Joi.string().required(),
});

const updateproductValidationSchema = Joi.object({
  ProductImage: Joi.array().items(Joi.string().required()).required(),
  ProductName: Joi.string().required(),
  Listingtype: Joi.boolean().required(),
  OpenForOffer: Joi.boolean().default(true),
  WhereToMeet: Joi.boolean().default(true),
  AddLocation: Joi.string().required(),
  Price: Joi.number().required(),
  Description: Joi.string().required(),
});

module.exports = {
  productValidationSchema,
  updateproductValidationSchema,
};
