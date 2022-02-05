/* eslint-disable consistent-return */
import { Request, Response } from 'express';

import * as authService from '../services/auth';
import LogInData from '../interfaces/logIn';

export async function createNewSession(req: Request, res: Response) {
  try {
    const userData = req.body as LogInData;

    const data = await authService.signIn(userData);
    if (data === undefined) return res.sendStatus(400);
    if (data === false) return res.sendStatus(404);

    return res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
