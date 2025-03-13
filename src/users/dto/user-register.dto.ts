import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Не вірно вказаний email' })
	email: string;
	@IsString({ message: 'Не вказаний пароль' })
	password: string;
	@IsString({ message: "Не вказане ім'я" })
	name: string;
}
