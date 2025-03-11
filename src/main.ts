import { Container, ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';

export interface IBootstrapReturnType {
	app: App;
	appContainer: Container;
}

export const appBinding = new ContainerModule((bind: ContainerModuleLoadOptions) => {
	bind.bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind.bind<UserController>(TYPES.UserController).to(UserController);
	bind.bind<App>(TYPES.Application).to(App);
});
function bootstrap(): IBootstrapReturnType {
	const appContainer = new Container();
	appContainer.load(appBinding);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
