import { User } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../dtos/user.dto';

export class UserMapper {
  public static toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email.value,
      name: user.name,
      isActive: user.isActive,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public static toResponseDtoList(users: User[]): UserResponseDto[] {
    return users.map((user) => this.toResponseDto(user));
  }
}
