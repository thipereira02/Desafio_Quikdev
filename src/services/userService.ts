/* eslint-disable consistent-return */
import dayjs from 'dayjs';

import User from '../entities/User';
import SignUpData from '../interfaces/signUp';
import editPhoneNumber from '../utils/editPhoneNumber';
import validateUserBody from '../utils/validateUserBody';

export async function createUser(userData: SignUpData) {
  const { name, email, password, username, birthdate, address, addressNumber, primaryPhone, description } = userData;

  const validate = validateUserBody(userData);
  if (!validate) return undefined;

  const user = await User.newUser(name, email, password, username, birthdate, address, addressNumber, primaryPhone, description);

  return user;
}

export async function getUser(id: number) {
  const user = await User.getUserById(id);
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

export async function getUserToUpdate(id: number, userData: SignUpData) {
  const user = await User.getUserById(id);
  if (!user) return false;

  const validate = validateUserBody(userData);
  if (!validate) return undefined;

  const ableToUpdate = await User.ableToUpdate(id, userData.email, userData.username);
  if (!ableToUpdate) return null;

  await User.updateData(id, userData);

  return true;
}
