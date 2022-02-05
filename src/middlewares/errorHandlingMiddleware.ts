/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import NotFoundError from '../errors/NotFoundError';

export default function errorHandlingMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof NotFoundError) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: 'Internal Server Error!',
  });
}
