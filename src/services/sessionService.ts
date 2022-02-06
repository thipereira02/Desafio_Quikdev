import Session from '../entities/Session';

export async function findSessionByToken(token: string) {
  const session = await Session.findOne({ where: { token } });

  return session;
}

export async function deleteSession(token: string) {
  const session = await Session.find({ where: { token } });
  if (session.length === 0) return false;

  await Session.remove(session);

  return true;
}
