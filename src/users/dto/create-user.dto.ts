import { IsEmpty, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsEmpty()
  nome: string;
  @IsInt()
  idade: number;
}
