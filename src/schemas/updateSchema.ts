import joi from 'joi';

export const updateSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().trim().email().required(),
  username: joi.string().trim().required(),
  birthdate: joi.date().required(),
  address: joi.string().trim().required(),
  addressNumber: joi.string().trim().required(),
  primaryPhone: joi.string().length(10).pattern(/^[0-9]+$/).required(),
  description: joi.string().required(),
});
