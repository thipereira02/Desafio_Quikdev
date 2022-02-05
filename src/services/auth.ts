import jwt from 'jsonwebtoken';

import LogInData from '../interfaces/logIn';
import User from '../entities/User';
import Session from '../entities/Session';
import { logInSchema } from '../schemas/logInSchema';

export async function signIn(userData: LogInData) {
  const { email, password } = userData;

  const bodyIsValid = logInSchema.validate(userData);
  if (bodyIsValid.error !== undefined) return undefined;

  const user = await User.findByEmailAndPassword(email, password);
  if (!user) return false;

  const token = jwt.sign({
    userId: user.id,
  }, process.env.JWT_SECRET);

  await Session.createNew(user.id, token);

  return {
    user: user.getMainAtributes(),
    token,
  };
}
