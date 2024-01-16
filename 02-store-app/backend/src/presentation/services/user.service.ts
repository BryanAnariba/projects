import { AppDataSource, Bcrypt } from "../../config";
import { PaginationDto } from "../../domain/dto";
import { User } from '../../config/entity/User';
import { UserEntity } from "../../domain/entities";
import { CreateUserDto } from "../../domain/dto/users/create-user.dto";
import { CustomError } from "../../domain/errors";

export class UserService {

  constructor () {}

  public async getUsers (paginationDto: PaginationDto) {
    const usersRepository = AppDataSource.getRepository(User);
    const [totalUsers, users] = await Promise.all([
      usersRepository.countBy({deletedAt: null}),
      usersRepository.find({
        where: {
          deletedAt: null,
        },
        skip: ((paginationDto.page - 1) * paginationDto.limit),
        take: paginationDto.limit
      }),
    ]);

    return {
      totalUsers,
      page: paginationDto.page,
      limit: paginationDto.limit,
      previusPage: (paginationDto.page - 1 > 0) ? `/api/v1/users?page=${paginationDto.page - 1}&limit=${paginationDto.limit}` : null,
      currentPage: `/api/v1/users?page=${paginationDto.page}&limit=${paginationDto.limit}`,
      nextPage: `/api/v1/users?page=${paginationDto.page + 1}&limit=${paginationDto.limit}`,
      users: users,
    };
  }

  public async getUser (userId: string): Promise<UserEntity> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        id: userId,
        deletedAt: null,
      }
    });
    
    return UserEntity.getObjectFromJson(user);
  }

  public async createUser(createUserDto: CreateUserDto)/*: Promise<UserEntity> */{
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({email: createUserDto.email});

    if (user) throw CustomError.badRequest('User already exists');

    const userSaved = await userRepository.save({
      ...createUserDto,
      password: Bcrypt.hashPassword(createUserDto.password),
    });
    return UserEntity.getObjectFromJson(userSaved);
  }
}