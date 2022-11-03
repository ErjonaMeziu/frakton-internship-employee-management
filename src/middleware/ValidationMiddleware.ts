import {Request,Response, NextFunction } from 'express';

import {AsyncValidationOptions, ObjectSchema } from 'joi';


export const ValidationMiddleware = (schema: ObjectSchema,options:AsyncValidationOptions={}) =>
{
    return async (req: Request, res: Response, next: NextFunction) =>
   {        
        try
        {
            await schema.validateAsync(req.body,options);
            return next();
        }
        catch (err:any)
        {
            res.status(422).send({ data: err?.message });
        }
    }
}