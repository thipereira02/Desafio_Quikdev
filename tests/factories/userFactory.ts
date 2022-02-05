import { getRepository } from 'typeorm';

import User from '../../src/entities/User';

export async function createUser() {
  const user = getRepository(User).create({
    name: 'Teste',
    email: 'teste@teste.com',
    password: '123456',
    username: 'teste123',
    birthdate: '10/10/10',
    address: 'Rua do Pássaro',
    addressNumber: '10A',
    primaryPhone: '1012345678',
    description: 'A very experient user',
  });

  await getRepository(User).save(user);

  return user;
}
