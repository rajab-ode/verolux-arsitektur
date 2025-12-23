import jwt from 'jsonwebtoken';
import { ITokenService, TokenPayload } from '../../application/interfaces/service.interface';
import { UnauthorizedError } from '../../domain/errors/domain.error';
import { env } from '../config/env.config';

export class JwtTokenService implements ITokenService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(secret?: string, expiresIn?: string) {
    this.secret = secret ?? env.JWT_SECRET;
    this.expiresIn = expiresIn ?? env.JWT_EXPIRES_IN;
  }

  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.secret) as TokenPayload;
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired token');
    }
  }

  decodeToken(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload;
    } catch {
      return null;
    }
  }
}
