import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/users.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  //creating new users
  async create(data: object) {
    const res = await this.userModel.create(data);
    return res;
  }

  //finding new userby id
  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  //finding email by id
  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  //
  async update(id: string, attrs: Partial<User>) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.userModel.findByIdAndUpdate(id, attrs);
  }
  async remove(id: string) {
    const user = await this.userModel.findOneAndRemove({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return 'user successfully deleted';
  }
}
