import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth';
import { DecodeDataModel } from '../interfaces/models/decodeModel';

export const AuthMiddleware = (...allowedRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader)
        {
            res.status(401).send({ data: 'You are not logged in!' });
            return;
        }
            const token = (authHeader as string).split(' ')[1];

            jwt.verify(token, JWT_SECRET, async (err, decoded) =>
            {
                if (err) res.status(401).send({ data: 'Unathorized user' });
                else
                {
                    res.locals.jwt = decoded;
                    const decodedObj = decoded as DecodeDataModel;
                    const role = decodedObj.payload.role;
                    
                    allowedRoles.includes(role) ? next() : res.status(403).send({ data: 'Unathorized user' });
                    return;
                }
            });
        
    };
};
