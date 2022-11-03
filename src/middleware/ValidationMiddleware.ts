import {Request,Response, NextFunction } from 'express';

import { ObjectSchema } from 'joi';


export const ValidationMiddleware = (schema: ObjectSchema) =>
{
    return async (req: Request, res: Response, next: NextFunction) =>
   {        
        try
        {
            await schema.validate(req.body);
            next();
        }
        catch (err)
        {
            res.status(422).send({ data: 'UNPROCESSABLE_ENTITY' });
        }
    }
}