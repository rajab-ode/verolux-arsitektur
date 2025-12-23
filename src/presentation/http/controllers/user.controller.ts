import { Request, Response, NextFunction } from 'express';
import {
  CreateUserUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  ListUsersUseCase,
} from '../../../application/use-cases/user';
import { getUserRepository } from '../../../infrastructure/database/repositories/user.repository';
import { BcryptHashService } from '../../../infrastructure/services/hash.service';
import { ApiResponse } from '../../../application/dtos/common.dto';
import { UserResponseDto, UsersListResponseDto } from '../../../application/dtos/user.dto';

const userRepository = getUserRepository();
const hashService = new BcryptHashService();

export class UserController {
  async createUser(
    req: Request,
    res: Response<ApiResponse<UserResponseDto>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const useCase = new CreateUserUseCase(userRepository, hashService);
      const user = await useCase.execute(req.body);

      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(
    req: Request,
    res: Response<ApiResponse<UserResponseDto>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const useCase = new GetUserUseCase(userRepository);
      const user = await useCase.execute({ userId: req.params.id });

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response<ApiResponse<UserResponseDto>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const useCase = new UpdateUserUseCase(userRepository);
      const user = await useCase.execute({
        userId: req.params.id,
        data: req.body,
      });

      res.json({
        success: true,
        data: user,
        message: 'User updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const useCase = new DeleteUserUseCase(userRepository);
      await useCase.execute({ userId: req.params.id });

      res.json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async listUsers(
    req: Request,
    res: Response<ApiResponse<UsersListResponseDto>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const useCase = new ListUsersUseCase(userRepository);
      const result = await useCase.execute({ page, limit });

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
