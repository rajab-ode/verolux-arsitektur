import { z } from 'zod';

export const PaginationDtoSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export const IdParamDtoSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

export type PaginationDto = z.infer<typeof PaginationDtoSchema>;
export type IdParamDto = z.infer<typeof IdParamDtoSchema>;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
