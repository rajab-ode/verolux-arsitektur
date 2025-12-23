import { Request, Response, NextFunction } from 'express';
import { JwtTokenService } from '../../../infrastructure/services/token.service';
import { UnauthorizedError, ForbiddenError } from '../../../domain/errors/domain.error';
import { TokenPayload } from '../../../application/interfaces/service.interface';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

const tokenService = new JwtTokenService();

export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('No authorization header provided');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedError('Invalid authorization header format');
    }

    const payload = tokenService.verifyToken(token);
    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
}

export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('Insufficient permissions'));
    }

    next();
  };
}
