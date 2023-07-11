import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(private repo: UserRepository) {}

  //creating new user
  create(id: number, email: string, password: string) {
    const data: object = {
      id: id,
      email: email,
      password: password,
    };
    return this.repo.create(data);
  }

  //finding one user by userid
  findOne(id: string) {
    return this.repo.findById(id);
  }

  //finding user using the email of the user
  find(email: string) {
    return this.repo.findByEmail(email);
  }

  //updating user- in this we are using the find and save cause
  // we want the hooks associated with it to run
  async update(id: string, attrs: Partial<User>) {
    return this.repo.update(id, attrs);
  }
  async remove(id: string) {
    return this.repo.remove(id);
  }
}
