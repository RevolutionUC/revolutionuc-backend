import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { User, Role, UserDto, LoginDto } from './user.entity';
import { RoleGuard } from './role.guard';
import { AuthService } from './auth.service';
import { UseAuth } from './auth.decorator';
import { CurrentUser, CurrentUserDto } from './currentuser';

const judgingRoles: Role[] = [`ADMIN`, `SUDO`, `JUDGE`];

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`login`)
  login(
    @Body() credentials: Pick<UserDto, 'username' | 'password'>,
  ): Promise<LoginDto> {
    console.log(credentials);
    return this.authService.login(
      credentials.username,
      credentials.password,
      judgingRoles,
    );
  }

  @UseAuth(judgingRoles)
  @Get('/me')
  @UseGuards(RoleGuard)
  getUserDetails(@CurrentUser() user: CurrentUserDto): Promise<User> {
    return this.authService.getUserDetails(user.id, judgingRoles);
  }
}
