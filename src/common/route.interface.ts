import { Response, Request, NextFunction, Router } from 'express';
import { IMiddaleware } from './middleware.interface';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	middlewares?: IMiddaleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
