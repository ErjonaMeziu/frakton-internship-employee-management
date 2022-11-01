import { NextFunction, request, Request, Response, Router } from 'express';
import { PingService } from '../services/Ping.service';
import { RegisterService } from '../services/registerService';
import { LoginService } from '../services/LoginService';
<<<<<<< Updated upstream

=======
import { schema } from '../validators/userInputValidator';
import Joi from 'joi';
import { verifyJWT } from '../middleware/verifyJWT';
>>>>>>> Stashed changes

export const AuthController: Router = Router();

AuthController.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const { userName, userEmail, password, companyName } = req.body;
    try {
        const result = await RegisterService.register(userName, userEmail, password, companyName);

        res.status(result.status).send({
            data: result.data,
        });
       
    } catch (e) {
        next(e);
    }
});

AuthController.post('/login', async (req: Request, res: Response, next: NextFunction) => {
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

AuthController.post('/login', async (req: Request, res: Response, next: NextFunction) => {
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



