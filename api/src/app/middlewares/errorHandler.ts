import { ErrorRequestHandler, Request, Response } from 'express';

export default function errorHandler(
  error: ErrorRequestHandler,
  request: Request,
  response: Response
) {
  console.log(error);
  response.sendStatus(500);
}
