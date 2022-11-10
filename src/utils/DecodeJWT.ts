import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { DecodeDataModel } from '../interfaces/models/decodeModel';

export const DecodeJWT = (authHeader: string) => {

    const token = authHeader.split(' ')[1];

    const decoded = jwt.decode(token);

    const decObj = decoded as DecodeDataModel;

    return decObj.payload.user_id;
};
