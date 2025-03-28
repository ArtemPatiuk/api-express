import { NextFunction, Request, Response } from 'express';

export interface IUsersControllerInterface {
	register: (req: Request, res: Response, next: NextFunction) => void;
	login: (req: Request, res: Response, next: NextFunction) => void;
	info: (req: Request, res: Response, next: NextFunction) => void;
}
