import { NextFunction, Request, Response, Router } from 'express';

import { PingService } from '../services/Ping.service';
import { AuthMiddleware} from '../middleware/AuthMiddleware';
import { Role } from '@prisma/client';
export const PingController: Router = Router();

PingController.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await PingService.test();

        res.status(200).send({
            data: result,
        });
    } catch (e) {
        next(e);
    }
});

PingController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await PingService.test();

        res.status(200).send({
            data: result,
        });
    } catch (e) {
        next(e);
    }
});

PingController.get('/welcome',AuthMiddleware(Role.CompanyAdmins),async (req: Request, res: Response, next: NextFunction) => {
    try {
       
        // const result = await PingService.test(id);
       
        const result = await PingService.test();

        res.status(200).send({
            data: result,
        });
    } catch (e) {
        next(e);
    }
});
