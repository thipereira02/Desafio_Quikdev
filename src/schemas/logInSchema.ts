import joi from 'joi';

export const logInSchema = joi.object({
  email: joi.string().trim().email().required(),
  password: joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/),
});
