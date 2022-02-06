/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';

import * as sessionService from '../services/sessionService';

export default async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.header('Authorization');

    const token = authHeader?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);

    const userSession = await sessionService.findSessionByToken(token);

    if (userSession.token !== token) {
      return res.sendStatus(404);
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
