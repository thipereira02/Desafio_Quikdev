/* eslint-disable consistent-return */
import { getRepository } from 'typeorm';
import dayjs from 'dayjs';

import User from '../entities/User';
import UserData from '../interfaces/user';
import { userSchema } from '../schemas/userSchema';
import editPhoneNumber from '../utils/editPhoneNumber';

export async function createUser(userData: UserData) {
  const { name, email, password, username, birthdate, address, addressNumber, primaryPhone, description } = userData;
  const bodyIsValid = userSchema.validate(userData);
  if (bodyIsValid.error !== undefined) return undefined;

  const user = await User.createNew(name, email, password, username, birthdate, address, addressNumber, primaryPhone, description);

  return user;
}

export async function getUser(id: number) {
  const user = await getRepository(User).findOne({ id });
  if (!user) return false;
  const phone = editPhoneNumber(user.primaryPhone);
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    birthdate: dayjs(user.birthdate).format('DD/MM/YYYY'),
    address: user.address,
    addressNumber: user.addressNumber,
    primaryPhone: phone,
    description: user.description,
    createdAt: dayjs(user.createdAt).format('DD/MM/YYYY'),
  };
}

export async function deleteUser(id: number) {
  const user = await getRepository(User)
    .find({
      where: [
        { id },
      ],
    });
  if (user.length === 0) return false;

  await getRepository(User).remove(user);

  return true;
}
