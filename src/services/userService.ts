/* eslint-disable consistent-return */
import { getRepository } from 'typeorm';
import dayjs from 'dayjs';

import User from '../entities/User';
import UserData from '../interfaces/user';
import { userSchema } from '../schemas/userSchema';
import editPhoneNumber from '../utils/editPhoneNumber';

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

export async function createUser(userData: UserData) {
  const { username } = userData;
  const bodyIsValid = userSchema.validate(userData);
  if (bodyIsValid.error !== undefined) return undefined;

  const usernameInUse = await getRepository(User)
    .find({
      where: [
        { username },
      ],
    });
  if (usernameInUse.length !== 0) return false;

  const newUser = getRepository(User).create(userData);
  await newUser.save();

  return newUser;
}
