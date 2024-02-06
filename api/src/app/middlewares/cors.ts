import { NextFunction, Request, Response } from 'express';

export default function cors(request: Request, response: Response, next: NextFunction) {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

  const origin = request.header('origin');

  const isAllowed = allowedOrigins.includes(origin);

  response.setHeader('Access-Control-Allow-Origin', origin || '*');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Max-Age', '20');
  next();
}
