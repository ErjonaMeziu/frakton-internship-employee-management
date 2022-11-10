import { NextFunction, request, Request, Response, Router } from 'express';
import { RegisterService } from '../services/registerService';
import { LoginService } from '../services/LoginService';
import { prisma } from '@prisma/client';
import { RegisterValidator } from '../validators/AuthValidator';
import { LoginValidator } from '../validators/AuthValidator';
import { ValidationMiddleware } from '../middleware/ValidationMiddleware';
import { upload } from '../middleware/MulterMiddleware';

export const AuthController: Router = Router();

AuthController.post(
    '/register',upload.single("logo"),
    async (req: Request, res: Response, next: NextFunction) =>
    {  
        //console.log(req.file?.path);
        //console.log(req.body);
        const filePath:any = req.file?.path;
        const { userName, userEmail, password, companyName,} = req.body;

        try {
            const result = await RegisterService.register(userName, userEmail, password, companyName,filePath);
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
