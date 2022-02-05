import { getRepository } from 'typeorm';

import User from '../entities/User';

export async function getUser(id: number) {
  const user = await getRepository(User).find({
    where: { id },
  });

  return user;
}
