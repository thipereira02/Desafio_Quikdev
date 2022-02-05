import { Request, Response } from 'express';

import * as userService from '../services/userService';

export async function getUserById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUser(id);
    res.send(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
