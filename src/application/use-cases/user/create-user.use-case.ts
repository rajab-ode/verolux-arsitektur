import { IUseCase } from '../../interfaces/use-case.interface';
import { IHashService } from '../../interfaces/service.interface';
import { IUserRepository } from '../../../domain/interfaces/repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import { ConflictError } from '../../../domain/errors/domain.error';
import { CreateUserDto, UserResponseDto } from '../../dtos/user.dto';
import { UserMapper } from '../../mappers/user.mapper';

export class CreateUserUseCase implements IUseCase<CreateUserDto, UserResponseDto> {
  constructor(
    private readonly userRepository: IUserRepository<User>,
    private readonly hashService: IHashService
  ) {}

  async execute(input: CreateUserDto): Promise<UserResponseDto> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Create value objects
    const email = Email.create(input.email);
    const password = Password.create(input.password);

    // Hash password
    const hashedPassword = await this.hashService.hash(password.value);

    // Create user entity
    const user = User.create({
      email,
      password: Password.fromHashed(hashedPassword),
      name: input.name,
    });

    // Persist user
    const savedUser = await this.userRepository.create(user);

    // Return response DTO
    return UserMapper.toResponseDto(savedUser);
  }
}
