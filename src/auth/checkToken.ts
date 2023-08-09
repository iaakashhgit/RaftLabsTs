import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

const SECRET_TOKEN: string = process.env.SECRET_TOKEN

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication token not provided' });
  }

  jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired authentication token :(' });
    }
    next();
  });
}

export default authenticateToken;
