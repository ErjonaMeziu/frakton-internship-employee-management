import { NextFunction, Request, Response, Router } from 'express';

import { RegisterService } from '../services/RegisterService';

export const AuthController: Router = Router();

AuthController.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const { userName, userEmail, password, companyName } = req.body;
    try {
        const result = await RegisterService.register(userName, userEmail, password, companyName);

        res.status(200).send({
            success: 'succesful request to join our platform',
        });
       
    } catch (e) {
        next(e);
    }
});

