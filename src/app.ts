import express, { Express } from 'express'
import { Server } from "http"
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: ILogger;
    exeptionFilter: ExeptionFilter;
    userController: UserController;

    constructor(logger: ILogger, userController: UserController, exeptionFilter: ExeptionFilter) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
    }
    useRoutes(): void {
        this.app.use('/users', this.userController.router);
    }

    useExeptionFilters(): void {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }
    public async init() {
        this.useRoutes();
        this.useExeptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server work on ${this.port} port`)
    }
}
