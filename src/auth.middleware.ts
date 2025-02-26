import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'; 

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access Denied');

    try {
      const verified = jwt.verify(token, 'SECRET_KEY'); 
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send('Invalid Token');
    }
  }
}