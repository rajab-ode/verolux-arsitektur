import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import {
  DomainError,
  EntityNotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
} from '../../../domain/errors/domain.error';
import { ApiResponse } from '../../../application/dtos/common.dto';
import { ConsoleLoggerService } from '../../../infrastructure/services/logger.service';

const logger = new ConsoleLoggerService('ErrorHandler');

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.error('Error occurred', error);

  let statusCode = 500;
  let response: ApiResponse<null> = {
    success: false,
    message: 'Internal server error',
  };

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    statusCode = 400;
    const errors: Record<string, string[]> = {};
    error.errors.forEach((err) => {
      const path = err.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(err.message);
    });
    response = {
      success: false,
      message: 'Validation failed',
      errors,
    };
  }

  // Handle custom domain errors
  if (error instanceof EntityNotFoundError) {
    statusCode = 404;
    response = {
      success: false,
      message: error.message,
    };
  } else if (error instanceof ValidationError) {
    statusCode = 400;
    response = {
      success: false,
      message: error.message,
      errors: error.errors,
    };
  } else if (error instanceof UnauthorizedError) {
    statusCode = 401;
    response = {
      success: false,
      message: error.message,
    };
  } else if (error instanceof ForbiddenError) {
    statusCode = 403;
    response = {
      success: false,
      message: error.message,
    };
  } else if (error instanceof ConflictError) {
    statusCode = 409;
    response = {
      success: false,
      message: error.message,
    };
  } else if (error instanceof DomainError) {
    statusCode = 400;
    response = {
      success: false,
      message: error.message,
    };
  }

  res.status(statusCode).json(response);
}
