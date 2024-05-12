import Joi from "joi";
import emailValidationSchema from "./emailValidationSchema";
import phoneValidationSchema from "./phoneValidationSchema";
import addressValidationSchema from "./addressValidationSchema";

Joi.objectId = require("joi-objectid")(Joi);

const userValidationSchema = Joi.object({
  external_id: Joi.string().allow(null, "").optional(),
  primary_email_address_id: Joi.string()
    .required()
    .label("Primary Email Address"),
  primary_phone_number_id: Joi.string()
    .required()
    .label("Primary Phone Number"),
  username: Joi.string().required().min(3).max(30),
  first_name: Joi.string().min(1).max(100).required(),
  last_name: Joi.string().min(1).max(100).required(),
  profile_image_url: Joi.string().uri().allow("").optional(),
  image_url: Joi.string().uri().allow("").optional(),
  addresses: Joi.array().items(addressValidationSchema).label("Addresses"),
  has_image: Joi.boolean().default(false),
  email_addresses: Joi.array()
    .items(emailValidationSchema)
    .label("Email Addresses"),
  phone_numbers: Joi.array()
    .items(phoneValidationSchema)
    .label("Phone Numbers"),
  password_enabled: Joi.boolean().default(false),
  two_factor_enabled: Joi.boolean().default(false),
  last_sign_in_at: Joi.number().integer().optional(),
  banned: Joi.boolean().default(false),
  locked: Joi.boolean().default(false),
  verification_attempts_remaining: Joi.number().integer().min(0).default(3),
  delete_self_enabled: Joi.boolean().default(false),
  last_active_at: Joi.date().timestamp().optional(),
});

export default userValidationSchema;
