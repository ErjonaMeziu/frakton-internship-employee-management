import { Application, Router } from "express";

import { PingController } from "./controllers/Ping.controller";
import { registerController } from './controllers/registerController';

const _routes: [string, Router][] = [
    ['/ping', PingController],['/register',registerController]
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
