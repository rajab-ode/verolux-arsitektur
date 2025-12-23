import { IUseCase } from '../../interfaces/use-case.interface';
import { IUserRepository } from '../../../domain/interfaces/repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { EntityNotFoundError, ConflictError } from '../../../domain/errors/domain.error';
import { UpdateUserDto, UserResponseDto } from '../../dtos/user.dto';
import { UserMapper } from '../../mappers/user.mapper';

interface UpdateUserInput {
  userId: string;
  data: UpdateUserDto;
}

export class UpdateUserUseCase implements IUseCase<UpdateUserInput, UserResponseDto> {
  constructor(private readonly userRepository: IUserRepository<User>) {}

  async execute(input: UpdateUserInput): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(input.userId);

    if (!user) {
      throw new EntityNotFoundError('User', input.userId);
    }

    // Update email if provided
    if (input.data.email && input.data.email !== user.email.value) {
      const existingUser = await this.userRepository.findByEmail(input.data.email);
      if (existingUser && existingUser.id !== user.id) {
        throw new ConflictError('User with this email already exists');
      }
      user.updateEmail(Email.create(input.data.email));
    }

    // Update name if provided
    if (input.data.name) {
      user.updateName(input.data.name);
    }

    // Save changes
    const updatedUser = await this.userRepository.update(user);

    return UserMapper.toResponseDto(updatedUser);
  }
}
