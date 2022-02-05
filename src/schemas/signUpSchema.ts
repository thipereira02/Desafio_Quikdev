import joi from 'joi';

export const signUpSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().trim().email().required(),
  password: joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/),
  confirmPassword: joi.ref('password'),
  username: joi.string().trim().required(),
  birthdate: joi.date().required(),
  address: joi.string().trim().required(),
  addressNumber: joi.string().trim().required(),
  primaryPhone: joi.string().length(10).pattern(/^[0-9]+$/).required(),
  description: joi.string().required(),
});
