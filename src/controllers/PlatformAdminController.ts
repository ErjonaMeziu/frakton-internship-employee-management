import { NextFunction, request, Request, Response, Router } from 'express';
import { PingService } from '../services/Ping.service';
import { RegisterService } from '../services/registerService';
import { LoginService } from '../services/LoginService';
import { JoiningRequestsService } from '../services/JoiningRequestsService';
import { ApproveRequestsService } from '../services/ApproveRequestsService';
import { UsingPlatformCompaniesService } from '../services/UsingPlatformCompaniesService';
import { RemoveCompanyService } from '../services/RemoveCompanyService';
import { ActiveCompaniesService } from '../services/ActiveCompaniesService';
import { InActiveCompaniesService } from '../services/InActiveCompaniesService';
import { DenyRequestsService } from '../services/DenyRequestsService'; 
import { Role } from '@prisma/client';
import { AuthMiddleware } from '../middleware/AuthMiddleware';

export const PlatformAdminController: Router = Router();

PlatformAdminController.get(
    '/requests',
    AuthMiddleware(Role.PlatformAdmin),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await JoiningRequestsService.getRequests();

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);

PlatformAdminController.patch(
    '/approve/:id',
    AuthMiddleware(Role.PlatformAdmin),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const result = await ApproveRequestsService.approveRequests(+id);

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);

PlatformAdminController.get(
    '/allcompanies',
    AuthMiddleware(Role.PlatformAdmin),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const result = await UsingPlatformCompaniesService.getUsingCompanies();

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);


PlatformAdminController.patch(
    '/remove/:id',
    AuthMiddleware(Role.PlatformAdmin),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const result = await RemoveCompanyService.remove(+id);

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);

PlatformAdminController.get(
    '/active',
    AuthMiddleware(Role.PlatformAdmin),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await ActiveCompaniesService.getActive();

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);

PlatformAdminController.get(
    '/inactive',
    AuthMiddleware(Role.PlatformAdmin),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await InActiveCompaniesService.getInActive();

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);

PlatformAdminController.put(
    '/deny/:id',
    AuthMiddleware(Role.PlatformAdmin),
    async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            const id = req.params.id;
            const result = await DenyRequestsService.denyRequests(+id);

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);