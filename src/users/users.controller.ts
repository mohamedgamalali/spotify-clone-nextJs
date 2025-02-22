import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignupDTO } from './dto/user-signup-dto';
import { UserSigninDTO } from './dto/user-signin.dto';

@Controller({ path: 'users' })
export class UsersController {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  @Post('signup')
  signup(@Body() user: UserSignupDTO) {
    return this.usersService.signup(user);
  }

  @Post('signin')
  signin(@Body() user: UserSigninDTO) {
    return this.usersService.signin(user);
  }
}
