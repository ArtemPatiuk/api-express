import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { IConfigServiceInterface } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { TYPES } from '../types';
@injectable()
export class ConfigService implements IConfigServiceInterface {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] Не вдалось прочитати файл .env');
		} else {
			this.logger.log('[ConfigService] Конфигурація .env завантажена');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get<T>(key: string): string {
		return this.config[key];
	}
}
