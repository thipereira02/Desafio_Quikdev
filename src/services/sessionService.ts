import Session from '../entities/Session';

export async function findSessionByToken(token: string) {
  const session = await Session.findByToken(token);
  return session;
}

export async function deleteSession(token: string) {
  await Session.deleteSession(token);
  return true;
}
