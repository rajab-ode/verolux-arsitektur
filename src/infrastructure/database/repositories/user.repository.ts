import { IUserRepository } from '../../../domain/interfaces/repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { InMemoryRepository } from './base.repository';

export class InMemoryUserRepository
  extends InMemoryRepository<User>
  implements IUserRepository<User>
{
  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.items.values()) {
      if (user.email.value === email.toLowerCase()) {
        return user;
      }
    }
    return null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user !== null;
  }
}

// Singleton instance for the in-memory repository
let userRepositoryInstance: InMemoryUserRepository | null = null;

export function getUserRepository(): InMemoryUserRepository {
  if (!userRepositoryInstance) {
    userRepositoryInstance = new InMemoryUserRepository();
  }
  return userRepositoryInstance;
}
