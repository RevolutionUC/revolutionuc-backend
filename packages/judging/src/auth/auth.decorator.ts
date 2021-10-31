import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from './user.entity';
import { RoleGuard, Roles } from './role.guard';
import { AuthGuard } from '@nestjs/passport';

export function UseAuth(roles?: Role[]) {
  if (roles && roles.length) {
    return applyDecorators(
      Roles(roles),
      UseGuards(AuthGuard(`jwt`), RoleGuard),
    );
  }
  return applyDecorators(UseGuards(AuthGuard(`jwt`)));
}
