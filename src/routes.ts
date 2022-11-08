import { Application, Router } from "express";
import { PingController } from "./controllers/Ping.controller";
import { AuthController } from './controllers/AuthController';
import { PlatformAdminController } from "./controllers/PlatformAdminController";
import { CompanyOwnerController } from "./controllers/CompanyOwnerContoller";

const _routes: [string, Router][] = [
    ['/ping', PingController],
    ['/auth', AuthController],
    ['/company', PlatformAdminController],
    ['/employee', CompanyOwnerController],
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
