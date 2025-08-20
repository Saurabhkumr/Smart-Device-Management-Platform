import Joi from "joi";

export const registerDeviceSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  type: Joi.string().required(),
  status: Joi.string().valid("active", "inactive").required(),
});

export const updateDeviceSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  type: Joi.string(),
  status: Joi.string().valid("active", "inactive"),
}).min(1);
