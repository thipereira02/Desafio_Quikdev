import SignUpData from '../interfaces/signUp';
import LogInData from '../interfaces/logIn';
import UpdateData from '../interfaces/update';
import { signUpSchema } from '../schemas/signUpSchema';
import { logInSchema } from '../schemas/logInSchema';
import { updateSchema } from '../schemas/updateSchema';

export function validateSignUpBody(userData: SignUpData) {
  const bodyIsValid = signUpSchema.validate(userData);
  if (bodyIsValid.error !== undefined) return undefined;
  return true;
}

export function validateLogInBody(userData: LogInData) {
  const bodyIsValid = logInSchema.validate(userData);
  if (bodyIsValid.error !== undefined) return undefined;
  return true;
}

export function validateUpdateBody(userData: UpdateData) {
  const bodyIsValid = updateSchema.validate(userData);
  if (bodyIsValid.error !== undefined) return undefined;
  return true;
}
