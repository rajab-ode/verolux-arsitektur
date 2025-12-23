import { z } from 'zod';

// Request DTOs
export const CreateUserDtoSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const UpdateUserDtoSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

export const LoginDtoSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;
export type LoginDto = z.infer<typeof LoginDtoSchema>;

// Response DTOs
export interface UserResponseDto {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponseDto {
  user: UserResponseDto;
  accessToken: string;
  expiresIn: string;
}

export interface UsersListResponseDto {
  users: UserResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
