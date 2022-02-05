/* eslint-disable consistent-return */
import { Request, Response } from 'express';

import * as userService from '../services/userService';

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
