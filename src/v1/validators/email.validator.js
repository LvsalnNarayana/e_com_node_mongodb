import Joi from "joi";

const emailValidationSchema = Joi.object({
  email_address: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .lowercase()
    .messages({
      "string.email": "Please fill a valid email address",
      "any.required": "Email address is required",
    }),
  verification: Joi.object({
    status: Joi.string().valid("VERIFIED", "UNVERIFIED").default("UNVERIFIED"),
    attempts: Joi.number().default(0),
    expire_at: Joi.number().default(0),
  }),
  linked_to: Joi.array().items(Joi.string()).messages({
    "string.uid": "Linked user must be a valid user ID",
  }),
});

export default emailValidationSchema;
