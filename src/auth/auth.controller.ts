import { Controller, Get, UseGuards, Param, HttpException, HttpStatus, Post, Body, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/authenticate')
  async authenticate(@Body() params): Promise<any> {
    if (!params.email || !params.password) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Data is missing!',
      }, 422);
    }

    return this.authService.getUserFromParams(params).then(user => {
      if (this.authService.comparePassword(user, params.password)) {
        return this.authService.createToken(user);
      }
      else {
        console.error('Password incorrect!');
      }
    }).catch(error => {
      console.error(error);
    });
  }

  @Post('/signup')
  async signup(@Body() user: User): Promise<any> {
    return await this.authService.signup(user);
  }

  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  findAll(@Request() req) {
    // this route is restricted
    // needs token in header
    // Example: "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...."
    console.log(req.user);
    return [];
  }
}
