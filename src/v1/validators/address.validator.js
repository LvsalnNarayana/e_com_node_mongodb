import Joi from "joi";

const addressValidationSchema = Joi.object({
  linked_to: Joi.array().items(Joi.string()).messages({
    "string.uid": "Linked user must be a valid user ID",
  }),
  street: Joi.string().required().messages({
    "string.empty": `"Street address" cannot be an empty field`,
    "any.required": `"Street address" is a required field`,
  }),
  city: Joi.string().required().messages({
    "string.empty": `"City" cannot be an empty field`,
    "any.required": `"City" is a required field`,
  }),
  state: Joi.string().required().messages({
    "string.empty": `"State" cannot be an empty field`,
    "any.required": `"State" is a required field`,
  }),
  postalCode: Joi.string()
    .pattern(/^\w{4,10}$/, "postal code")
    .required()
    .messages({
      "string.pattern.base": `"Postal code" must be between 4 and 10 alphanumeric characters`,
      "string.empty": `"Postal code" cannot be an empty field`,
      "any.required": `"Postal code" is a required field`,
    }),
  country: Joi.string().required().messages({
    "string.empty": `"Country" cannot be an empty field`,
    "any.required": `"Country" is a required field`,
  }),
  location: Joi.object({
    type: Joi.string().valid("Point").default("Point"),
    coordinates: Joi.array()
      .items(Joi.number())
      .length(2) // Assumes [longitude, latitude]
      .required(),
  }).required(),
});

export default addressValidationSchema;
