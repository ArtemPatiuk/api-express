export interface IConfigServiceInterface {
	get: <T>(key: string) => string;
}
