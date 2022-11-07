import express, { Application } from 'express';

import { routes } from './routes';
import { CorsMiddleware } from './middleware/CorsMiddleware';
import { AppErrorHandlerMiddleware } from './middleware/AppErrorHandlerMiddleware';

// Boot express
export const app: Application = express();
app.use(express.urlencoded({ extended: true}));
// CORS
app.use(CorsMiddleware);

// Express configuration
app.use(express.json());

// Application routing
routes(app);

// Application (global) error handling
app.use(AppErrorHandlerMiddleware);

import "../src/events/index";
