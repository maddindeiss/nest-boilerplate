import * as jwt from 'jsonwebtoken';
import { Injectable, HttpException, HttpStatus, BadRequestException, UnauthorizedException } from '@nestjs/common';
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

  async signup(user: User): Promise<any> {
    try {
      const tempUser = await this.userService.findOneByEmail(user.email);
      if (tempUser) return new UnauthorizedException('E-Mail is in use!');

      if (!tempUser) {
        console.log('jo');
      }
    }
    catch (error) {
      console.error(error);
    }
  }
}
