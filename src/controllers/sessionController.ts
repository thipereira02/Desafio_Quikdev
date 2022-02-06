/* eslint-disable consistent-return */
import { Request, Response } from 'express';

import * as sessionService from '../services/sessionService';

export async function deleteSession(req: Request, res: Response) {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    await sessionService.deleteSession(token);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
