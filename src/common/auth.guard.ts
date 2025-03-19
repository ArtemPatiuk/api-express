import { Request, Response, NextFunction } from 'express';
import { IMiddaleware } from './middleware.interface';

export class AuthGuard implements IMiddaleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			return next();
		}
		res.status(401).send({ error: 'Ви не авторизовані' });
	}
}
