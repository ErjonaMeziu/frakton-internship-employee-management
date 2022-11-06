import { Application, Router } from "express";
import { PingController } from "./controllers/Ping.controller";
import { AuthController } from './controllers/AuthController';
import { PlatformAdminController } from "./controllers/PlatformAdminController";

const _routes: [string, Router][] = [
    ['/ping',PingController],['/auth', AuthController],['/company',PlatformAdminController]
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
