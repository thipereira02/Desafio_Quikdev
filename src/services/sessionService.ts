import Session from '../entities/Session';

export async function findSessionByToken(token: string) {
  const session = await Session.findOne({ where: { token } });
  console.log(session);

  return session;
}
