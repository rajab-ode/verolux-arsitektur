export interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}

export interface IUserRepository<T> extends IRepository<T> {
  findByEmail(email: string): Promise<T | null>;
  existsByEmail(email: string): Promise<boolean>;
}

export interface IPaginatedRepository<T> extends IRepository<T> {
  findPaginated(page: number, limit: number): Promise<PaginatedResult<T>>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
