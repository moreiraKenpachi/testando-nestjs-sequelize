import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      return { error: 'nao tem usuário' };
    }
    return { nome: user.nome, idade: user.idade };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    // const existentUser = await this.usersService.findOne(+id);
    // if (!existentUser) {
    //   return { error: 'nao tem usuário' };
    // }
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const existentUser = await this.usersService.findOne(+id);
    if (!existentUser) {
      return { error: 'nao tem usuário' };
    }

    await this.usersService.remove(+id);
    return { message: 'Usuário excluído com sucesso.' };
  }
}
