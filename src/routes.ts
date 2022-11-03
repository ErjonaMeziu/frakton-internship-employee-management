import { Application, Router } from "express";
import { PingController } from "./controllers/Ping.controller";
import { AuthController } from './controllers/AuthController';


const _routes: [string, Router][] = [
    ['/ping',PingController],['/auth', AuthController],
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
