import { NextFunction, Request, Response } from 'express';

export default function cors(request: Request, response: Response, next: NextFunction) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Max-Age', '20');
  next();
}
