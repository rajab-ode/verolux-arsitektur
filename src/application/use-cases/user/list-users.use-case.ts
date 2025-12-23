import { IUseCase } from '../../interfaces/use-case.interface';
import { IUserRepository } from '../../../domain/interfaces/repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { UsersListResponseDto, UserResponseDto } from '../../dtos/user.dto';
import { UserMapper } from '../../mappers/user.mapper';
import { PaginationDto } from '../../dtos/common.dto';

export class ListUsersUseCase implements IUseCase<PaginationDto, UsersListResponseDto> {
  constructor(private readonly userRepository: IUserRepository<User>) {}

  async execute(input: PaginationDto): Promise<UsersListResponseDto> {
    const users = await this.userRepository.findAll();

    // Simple pagination implementation
    const startIndex = (input.page - 1) * input.limit;
    const endIndex = startIndex + input.limit;
    const paginatedUsers = users.slice(startIndex, endIndex);

    const userDtos: UserResponseDto[] = UserMapper.toResponseDtoList(paginatedUsers);

    return {
      users: userDtos,
      total: users.length,
      page: input.page,
      limit: input.limit,
      totalPages: Math.ceil(users.length / input.limit),
    };
  }
}
