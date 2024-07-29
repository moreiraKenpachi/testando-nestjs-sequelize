import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: Repository<User>,
  ) {}
  // constructor(
  //   @Inject('USERS_REPOSITORY')
  //   private readonly userRepository: typeof User,
  // ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create<User>(userDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findByPk<User>(id);
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    const [affectedCount, affectedRows] = await this.userRepository.update(
      updateUserDto,
      {
        where: { id },
        returning: true,
      },
    );
    return [affectedCount, affectedRows as User[]];
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne<User>({ where: { id } });
    await user.destroy();
  }
}
