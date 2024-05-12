import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);

const phoneValidationSchema = Joi.object({
  phone_number: Joi.string()
    .custom((value, helpers) => {
      if (!isMobilePhone(value, "any", { strictMode: false })) {
        return helpers.error("string.invalidPhoneNumber", { v: value });
      }
      return value;
    }, "Mobile Phone Validation")
    .message({
      "string.invalidPhoneNumber": '"{{#v}}" is not a valid phone number!',
    }),
  country_code: Joi.string()
    .pattern(/^\+[1-9]{1}[0-9]{1,3}$/, { name: "country code" })
    .required()
    .messages({
      "string.pattern.name": "Please fill a valid country code",
      "any.required": "Country code is required",
    }),
  default_second_factor: Joi.boolean().default(false),
  reserved: Joi.boolean().default(false),
  verification: Joi.object({
    status: Joi.string().valid("VERIFIED", "UNVERIFIED").default("UNVERIFIED"),
    attempts: Joi.number().default(0),
    expire_at: Joi.number().default(0),
  }),
  linked_to: Joi.array()
    .items(Joi.string())
    .message("Each linked user must be a valid user ID"),
});

export default phoneValidationSchema;
