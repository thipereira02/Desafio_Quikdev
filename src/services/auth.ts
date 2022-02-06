import LogInData from '../interfaces/logIn';
import User from '../entities/User';
import Session from '../entities/Session';
import { validateLogInBody } from '../utils/validateBody';

export async function signIn(userData: LogInData) {
  const { email, password } = userData;

  const validate = validateLogInBody(userData);
  if (!validate) return undefined;

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
