import { NextFunction, Request, Response } from 'express';

export default function cors(request: Request, response: Response, next: NextFunction) {
  response.setHeader('Acess-Control-Allow-Origin', 'http://localhost:5173');
  next();
}
