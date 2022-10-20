import { NextFunction, Request, Response, Router } from 'express';

import { PingService } from '../services/Ping.service';

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

PingController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        // const result = await PingService.test(id);

        const result = await PingService.test();

        res.status(200).send({
            data: result,
        });
    } catch (e) {
        next(e);
    }
});
