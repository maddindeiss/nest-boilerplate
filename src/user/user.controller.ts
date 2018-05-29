import { Controller, Get, Param } from '@nestjs/common';
import { pipe, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from './user.service';
import { User } from './user.entity';
import { classToPlain } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return classToPlain(users, { excludePrefixes: ['_'] }) as User[];
  }

  @Get(':id')
  async findOneById(@Param('id') id): Promise<User> {
    const user = await this.userService.findOneById(id);
    return classToPlain(user, { excludePrefixes: ['_'] }) as User;
  }
}
