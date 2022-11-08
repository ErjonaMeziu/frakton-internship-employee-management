import { NextFunction, request, Request, Response, Router } from 'express';
import { CreateEmployeeService } from '../services/CreateEmployeeService';
import { CurrentEmployeeService } from '../services/CurrentEmployeeService';
import { ExEmployeeService } from '../services/ExEmployeeService';
import { UpdatEemployeeService } from '../services/UpdateEmployeeService';
import { AllEmployeeService } from '../services/AllEmployeeService';
import { HiredEmployeeService } from '../services/HiredEmployeeService';
import { AnniversaryEmployeeService } from '../services/AnniversaryEmployeeService';
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
import { DecodeJWT } from '../utils/DecodeJWT';


export const CompanyOwnerController: Router = Router();

CompanyOwnerController.post(
    '/create',
    AuthMiddleware(Role.CompanyOwner),
    async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            const { userName,userEmail,password,role } = req.body;
            const companyOwnerId = DecodeJWT(req,res,next);
            const result = await CreateEmployeeService.create(userName, userEmail, password, role,companyOwnerId);

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
    AuthMiddleware(Role.CompanyOwner),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await CurrentEmployeeService.getCurrent();

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
    AuthMiddleware(Role.CompanyOwner),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await ExEmployeeService.getEx();

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
    AuthMiddleware(Role.CompanyOwner),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await AllEmployeeService.getAll();

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
            const id = req.params.id;
            const {userName,hired_at,deleted_at } = req.body;
            const result = await UpdatEemployeeService.update(+id,userName,hired_at,deleted_at);

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
    AuthMiddleware(Role.CompanyOwner),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await HiredEmployeeService.getHired();

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
    AuthMiddleware(Role.CompanyOwner),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await AnniversaryEmployeeService.getAnniversary();

            res.status(result.status).send({
                data: result.data,
            });
        } catch (e) {
            next(e);
        }
    }
);