/* eslint-disable consistent-return */
import { Request, Response } from 'express';

import * as userService from '../services/userService';
import UserData from '../interfaces/user';

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await userService.getUser(Number(req.params.id));
    if (!user) return res.sendStatus(404);

    res.send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function createNewUser(req: Request, res: Response) {
  try {
    const userData = req.body as UserData;
    const user = await userService.createUser(userData);
    if (user === undefined) return res.sendStatus(400);
    if (user === false) return res.sendStatus(409);

    return res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const user = await userService.deleteUser(Number(req.params.id));
    if (!user) return res.sendStatus(404);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
