import { IUseCase } from '../../interfaces/use-case.interface';
import { IUserRepository } from '../../../domain/interfaces/repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { EntityNotFoundError } from '../../../domain/errors/domain.error';
import { UserResponseDto } from '../../dtos/user.dto';
import { UserMapper } from '../../mappers/user.mapper';

interface GetUserInput {
  userId: string;
}

export class GetUserUseCase implements IUseCase<GetUserInput, UserResponseDto> {
  constructor(private readonly userRepository: IUserRepository<User>) {}

  async execute(input: GetUserInput): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(input.userId);

    if (!user) {
      throw new EntityNotFoundError('User', input.userId);
    }

    return UserMapper.toResponseDto(user);
  }
}
