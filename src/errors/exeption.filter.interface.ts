import { NextFunction, Request, Response } from 'express';

export interface IExeptionFilterInteface {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
