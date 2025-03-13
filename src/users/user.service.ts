import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserServiceInterface } from './user.service.interface';
import { IConfigServiceInterface } from '../config/config.service.interface';
import { TYPES } from '../types';

@injectable()
export class UserService implements IUserServiceInterface {
	constructor(@inject(TYPES.ConfigService) private ConfigService: IConfigServiceInterface) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.ConfigService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		return null;
	}
	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
