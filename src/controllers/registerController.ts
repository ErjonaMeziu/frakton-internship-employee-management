import { NextFunction, Request, Response, Router } from 'express';

import { registerService } from '../services/registerService';

export const registerController: Router = Router();

registerController.post('/', async (req: Request, res: Response, next: NextFunction) =>
{
    const{username,useremail,password,companyName}=req.body
    try {
        const result = await registerService.test(username,useremail,password,companyName);

        res.status(200).send({
            success: "succesful request to join our platform"
            
        });
        //send email to platform admin
    } catch (e) {
        next(e);
    }
});
