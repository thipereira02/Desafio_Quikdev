import SignUpData from '../interfaces/signUp';
import UpdateData from '../interfaces/update';
import { signUpSchema } from '../schemas/signUpSchema';
import { updateSchema } from '../schemas/updateSchema';

export function validateSignUpBody(userData: SignUpData) {
  const bodyIsValid = signUpSchema.validate(userData);
  if (bodyIsValid.error !== undefined) return undefined;
  return true;
}

export function validateUpdateBody(userData: UpdateData) {
  const bodyIsValid = updateSchema.validate(userData);
  if (bodyIsValid.error !== undefined) return undefined;
  return true;
}
