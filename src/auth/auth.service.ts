import * as jwt from 'jsonwebtoken';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async getUserFromParams(params): Promise<User> {
    const user = await this.userService.findOneByEmail(params.email);
    if (!user) {
      console.log(`User with E-Mail ${params.email} not found`);
    }

    return user;
  }

  comparePassword(user: User, password) {
    if (!password) return false;
    return user.password === password;
  }

  async createToken(user: User) {
    const authUser: JwtPayload = {
      email: user.email,
      lastname: user.lastname,
      username: user.username,
      createdAt: user.createdAt,
    };

    const expiresIn = 3600;
    const accessToken = jwt.sign(classToPlain(authUser, { excludePrefixes: ['_'] }), 'secretKey', { expiresIn });
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findOneByEmail(payload.email);
  }
}
