import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './users.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
