import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
