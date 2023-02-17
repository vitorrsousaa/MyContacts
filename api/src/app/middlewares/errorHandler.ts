import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export default function errorHandler(
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // console.log(error);
  console.log('inside errorHandler');
  response.sendStatus(500);
}
