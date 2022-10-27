import { NextFunction, Request, Response, Router } from 'express';

import { RegisterService } from '../services/RegisterService';
import { LoginService } from '../services/LoginService';


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

AuthController.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { userEmail, password } = req.body;
    try {
        const result = await LoginService.login(userEmail, password);

        res.status(200).send({
            success: result,
        });
    } catch (e) {
        next(e);
    }
});

