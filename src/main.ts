import { Container, ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IExeptionFilterInteface } from './errors/exeption.filter.interface';
import { UserService } from './users/user.service';
import { IUsersControllerInterface } from './users/users.controller.interface';
import { IUserServiceInterface } from './users/user.service.interface';
import { ConfigService } from './config/config.service';
import { IConfigServiceInterface } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';

export interface IBootstrapReturnType {
	app: App;
	appContainer: Container;
}

export const appBinding = new ContainerModule((bind: ContainerModuleLoadOptions) => {
	bind.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind.bind<IExeptionFilterInteface>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind.bind<IUsersControllerInterface>(TYPES.UserController).to(UserController);
	bind.bind<IUserServiceInterface>(TYPES.UserService).to(UserService);
	bind.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind.bind<IConfigServiceInterface>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
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
