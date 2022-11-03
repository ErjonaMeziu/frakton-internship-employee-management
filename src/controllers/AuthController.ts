import { NextFunction, request, Request, Response, Router } from 'express';
import { PingService } from '../services/Ping.service';
import { RegisterService } from '../services/registerService';
import { LoginService } from '../services/LoginService';
import { prisma } from '@prisma/client';
import { RegisterValidator } from '../validators/AuthValidator';
import { LoginValidator } from '../validators/AuthValidator';
import { ValidationMiddleware } from '../middleware/ValidationMiddleware';

export const AuthController: Router = Router();

AuthController.post(
    '/register',
    ValidationMiddleware(RegisterValidator, {}),
    async (req: Request, res: Response, next: NextFunction) => {
        const { userName, userEmail, password, companyName } = req.body;
        try {
            const result = await RegisterService.register(userName, userEmail, password, companyName);

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);

AuthController.post('/login', ValidationMiddleware(LoginValidator, {}), async (req: Request, res: Response, next: NextFunction) => {
    const { userEmail, password } = req.body;
    try {
        const result = await LoginService.login(userEmail, password);

        res.status(result.status).send({
            data: result.data,
        });
    } catch (e) {
        next(e);
    }
});
