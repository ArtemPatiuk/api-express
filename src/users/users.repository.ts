import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUsersRepositoryInterface } from './users.repository.interface';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@injectable()
export class UsersRepository implements IUsersRepositoryInterface {
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.PrismaService) private PrismaService: PrismaService,
	) {}
	async create({ email, name, password }: User): Promise<UserModel> {
		return this.PrismaService.client.userModel.create({
			data: {
				email,
				name,
				password,
			},
		});
	}
	async find(email: string): Promise<UserModel | null> {
		return this.PrismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
