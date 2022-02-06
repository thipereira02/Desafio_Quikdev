import SignUpData from '../interfaces/signUp';
import { signUpSchema } from '../schemas/signUpSchema';

export default function validateUserBody(userData: SignUpData) {
  const bodyIsValid = signUpSchema.validate(userData);
  if (bodyIsValid.error !== undefined) return undefined;
  return true;
}
