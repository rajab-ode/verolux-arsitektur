import { IUseCase } from '../../interfaces/use-case.interface';
import { IHashService, ITokenService } from '../../interfaces/service.interface';
import { IUserRepository } from '../../../domain/interfaces/repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { UnauthorizedError } from '../../../domain/errors/domain.error';
import { LoginDto, AuthResponseDto } from '../../dtos/user.dto';
import { UserMapper } from '../../mappers/user.mapper';

export class LoginUseCase implements IUseCase<LoginDto, AuthResponseDto> {
  constructor(
    private readonly userRepository: IUserRepository<User>,
    private readonly hashService: IHashService,
    private readonly tokenService: ITokenService
  ) {}

  async execute(input: LoginDto): Promise<AuthResponseDto> {
    // Find user by email
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedError('Account is deactivated');
    }

    // Verify password
    const isPasswordValid = await this.hashService.compare(
      input.password,
      user.password.value
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate token
    const accessToken = this.tokenService.generateToken({
      userId: user.id,
      email: user.email.value,
      role: user.role,
    });

    return {
      user: UserMapper.toResponseDto(user),
      accessToken,
      expiresIn: '7d',
    };
  }
}
