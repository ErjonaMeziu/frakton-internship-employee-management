import { Request, Response, NextFunction } from 'express';
import { ArraySchema, object, string } from 'joi';
import jwt, { GetPublicKeyOrSecret, JwtPayload, Secret, VerifyCallback, VerifyErrors } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth';
import { prisma } from '../config/prisma';
import { DecodeDataModel } from '../interfaces/models/decodeModel';

export const verifyJWT = (...allowedRoles: string[]) =>
{
    async (req: Request, res: Response, next: NextFunction) =>
    {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader) res.sendStatus(401);
        const token = (authHeader as string).split(' ')[1];

        jwt.verify(token, JWT_SECRET, async (err, decoded) =>
        {
            if (err) res.sendStatus(401).json({ data: "Unathorized user" });
            else
            {
                res.locals.jwt = decoded;
                const goodObj = decoded as DecodeDataModel;
                //const strObj = JSON.stringify(decoded as string);
                //const fullObj = JSON.parse(strObj);
                console.log(typeof goodObj.payload.role);
                const role = goodObj.payload.role;
                if (allowedRoles.includes(role))
                {
                    next();
                }
                else
                {
                    res.sendStatus(401).json({ data: "Unathorized user" });
                }
            }
            
        });
    }
};

verifyJWT("sss", "sss");