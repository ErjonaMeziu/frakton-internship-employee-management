import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { DecodeDataModel } from '../interfaces/models/decodeModel';

export const DecodeJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    const token = (authHeader as string).split(' ')[1];

    const decoded = jwt.decode(token);

    const decObj = decoded as DecodeDataModel;

    return decObj.payload.user_id;
};
