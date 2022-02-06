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

  const token = await Session.generateToken(password, user.password);
  if (!token) return undefined;

  await Session.createNew(user.id, token);

  return {
    user: user.getMainAtributes(),
    token,
  };
}
