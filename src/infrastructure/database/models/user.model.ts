// Database model representation for User entity
// This would typically map to your ORM (TypeORM, Prisma, etc.)

export interface UserModel {
  id: string;
  email: string;
  password: string;
  name: string;
  is_active: boolean;
  role: string;
  created_at: Date;
  updated_at: Date;
}

// Example mapping functions for ORM integration
export function toUserModel(entity: {
  id: string;
  email: string;
  password: string;
  name: string;
  isActive: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}): UserModel {
  return {
    id: entity.id,
    email: entity.email,
    password: entity.password,
    name: entity.name,
    is_active: entity.isActive,
    role: entity.role,
    created_at: entity.createdAt,
    updated_at: entity.updatedAt,
  };
}

export function fromUserModel(model: UserModel): {
  id: string;
  email: string;
  password: string;
  name: string;
  isActive: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
} {
  return {
    id: model.id,
    email: model.email,
    password: model.password,
    name: model.name,
    isActive: model.is_active,
    role: model.role,
    createdAt: model.created_at,
    updatedAt: model.updated_at,
  };
}
