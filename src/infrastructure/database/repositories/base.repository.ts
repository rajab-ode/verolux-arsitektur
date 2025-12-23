import { IRepository } from '../../../domain/interfaces/repository.interface';
import { BaseEntity, EntityProps } from '../../../domain/entities/base.entity';

// In-memory repository implementation (replace with actual database implementation)
export abstract class InMemoryRepository<T extends BaseEntity<EntityProps>>
  implements IRepository<T>
{
  protected items: Map<string, T> = new Map();

  async findById(id: string): Promise<T | null> {
    return this.items.get(id) ?? null;
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.items.values());
  }

  async create(entity: T): Promise<T> {
    this.items.set(entity.id, entity);
    return entity;
  }

  async update(entity: T): Promise<T> {
    this.items.set(entity.id, entity);
    return entity;
  }

  async delete(id: string): Promise<void> {
    this.items.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.items.has(id);
  }
}
