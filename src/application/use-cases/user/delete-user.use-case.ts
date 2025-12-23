import { IUseCaseWithoutOutput } from '../../interfaces/use-case.interface';
import { IUserRepository } from '../../../domain/interfaces/repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { EntityNotFoundError } from '../../../domain/errors/domain.error';

interface DeleteUserInput {
  userId: string;
}

export class DeleteUserUseCase implements IUseCaseWithoutOutput<DeleteUserInput> {
  constructor(private readonly userRepository: IUserRepository<User>) {}

  async execute(input: DeleteUserInput): Promise<void> {
    const exists = await this.userRepository.exists(input.userId);

    if (!exists) {
      throw new EntityNotFoundError('User', input.userId);
    }

    await this.userRepository.delete(input.userId);
  }
}
