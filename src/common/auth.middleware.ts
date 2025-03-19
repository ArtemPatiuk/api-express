import { NextFunction, Response, Request } from 'express';
import { IMiddaleware } from './middleware.interface';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddaleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload && typeof payload === 'object' && 'email' in payload) {
					req.user = payload.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
