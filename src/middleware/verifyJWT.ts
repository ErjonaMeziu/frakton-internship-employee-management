import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/auth';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) res.sendStatus(401);
    const token = (authHeader as string).split(' ')[1];
    console.log(token);
    next();
    try
    {
        jwt.verify(token, JWT_SECRET);
    
    } catch (err){
        res.sendStatus(401);
    }
  
};
