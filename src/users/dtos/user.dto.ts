import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  _id: string;

  @Expose()
  email: string;
}
