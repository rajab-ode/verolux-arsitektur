import { Request, Response, NextFunction } from 'express';
import { LoginUseCase } from '../../../application/use-cases/auth';
import { getUserRepository } from '../../../infrastructure/database/repositories/user.repository';
import { BcryptHashService } from '../../../infrastructure/services/hash.service';
import { JwtTokenService } from '../../../infrastructure/services/token.service';
import { ApiResponse } from '../../../application/dtos/common.dto';
import { AuthResponseDto } from '../../../application/dtos/user.dto';

const userRepository = getUserRepository();
const hashService = new BcryptHashService();
const tokenService = new JwtTokenService();

export class AuthController {
  async login(
    req: Request,
    res: Response<ApiResponse<AuthResponseDto>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const useCase = new LoginUseCase(userRepository, hashService, tokenService);
      const result = await useCase.execute(req.body);

      res.json({
        success: true,
        data: result,
        message: 'Login successful',
      });
    } catch (error) {
      next(error);
    }
  }

  async me(
    req: Request,
    res: Response<ApiResponse<{ userId: string; email: string; role: string }>>,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }

      res.json({
        success: true,
        data: {
          userId: req.user.userId,
          email: req.user.email,
          role: req.user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
