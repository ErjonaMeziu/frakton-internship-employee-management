import { NextFunction,  Request, Response, Router } from 'express';
import { CreateEmployeeService } from '../services/CreateEmployeeService';
import { CurrentEmployeeService } from '../services/CurrentEmployeeService';
import { ExEmployeeService } from '../services/ExEmployeeService';
import { UpdatEemployeeService } from '../services/UpdateEmployeeService';
import { AllEmployeeService } from '../services/AllEmployeeService';
import { HiredEmployeeService } from '../services/HiredEmployeeService';
import { AnniversaryEmployeeService } from '../services/AnniversaryEmployeeService';
import { Role } from '@prisma/client';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { DecodeJWT } from '../utils/DecodeJWT';

export const CompanyOwnerController: Router = Router();

CompanyOwnerController.post(
    '/create',
    AuthMiddleware(Role.CompanyOwner),
    async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            const { userName, userEmail, password, role } = req.body;

            const userId = DecodeJWT(req.headers?.authorization || '');
            const result = await CreateEmployeeService.create(userName, userEmail, password, role,userId);

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);

CompanyOwnerController.get(
    '/current',
    AuthMiddleware(Role.CompanyOwner,Role.CompanyAdmins),
    async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            const userId = DecodeJWT(req.headers?.authorization || '');
            const result = await CurrentEmployeeService.getCurrent(userId);

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);

CompanyOwnerController.get(
    '/ex',
    AuthMiddleware(Role.CompanyOwner,Role.CompanyAdmins),
    async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            const userId = DecodeJWT(req.headers?.authorization || '');
            const result = await ExEmployeeService.getEx(userId);

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);

CompanyOwnerController.get(
    '/all',
    AuthMiddleware(Role.CompanyOwner,Role.CompanyAdmins),
    async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            const userId = DecodeJWT(req.headers?.authorization || '');
            const result = await AllEmployeeService.getAll(userId);

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);

CompanyOwnerController.put(
    '/update/:id',
    AuthMiddleware(Role.CompanyOwner),
    async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            const userId = DecodeJWT(req.headers?.authorization || '');
            const id = req.params.id;
            const {userName,hired_at,deleted_at } = req.body;
            const result = await UpdatEemployeeService.update(+id,userName,hired_at,deleted_at,userId);

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);

CompanyOwnerController.get(
    '/future',
    AuthMiddleware(Role.CompanyOwner,Role.CompanyAdmins),
    async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            const userId = DecodeJWT(req.headers?.authorization || '');
            const result = await HiredEmployeeService.getHired(userId);

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);

CompanyOwnerController.get(
    '/anniversary',
    AuthMiddleware(Role.CompanyOwner,Role.CompanyAdmins),
    async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            const userId = DecodeJWT(req.headers?.authorization || '');
            const result = await AnniversaryEmployeeService.getAnniversary(userId);

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);