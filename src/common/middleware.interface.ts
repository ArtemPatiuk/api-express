import { NextFunction, Request, Response } from 'express';

export interface IMiddaleware {
	execute(req: Request, res: Response, next: NextFunction): void;
}
