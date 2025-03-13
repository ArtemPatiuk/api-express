import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserServiceInterface } from './users.service.interface';
import { IConfigServiceInterface } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UsersRepository } from './users.repository';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserServiceInterface {
	constructor(
		@inject(TYPES.ConfigService) private ConfigService: IConfigServiceInterface,
		@inject(TYPES.UsersRepository) private UsersRepository: UsersRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.ConfigService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.UsersRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.UsersRepository.create(newUser);
	}
	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const user = await this.UsersRepository.find(email);
		if (!user) {
			return false;
		}
		const newUser = new User(user.email, user.name, user.password);
		return newUser.comparePassword(password);
	}
}
