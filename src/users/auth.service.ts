import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signup(email: string, password: string) {
    //see if email is in use
    const users = await this.userRepository.findByEmail(email);
    if (users) {
      throw new BadRequestException('Email in use');
    }
    // hash the user password
    // generate a salt
    const salt = randomBytes(8).toString('hex');

    // hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //join the salt and the hash passwaord
    const result = salt + '.' + hash.toString('hex');

    //create a neaw user and saave it
    const data: object = {
      email: email,
      password: result,
    };
    const user = await this.userRepository.create(data);
    return user;
    //return the user

    // creat a user and save it
    // return the user
  }
  async signin(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
