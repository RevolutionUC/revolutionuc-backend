import { Module } from '@nestjs/common';
// import { CqrsModule } from '@nestjs/cqrs';
import { CheckPermissionHandler } from './Commands/Handlers/check-permission.handler';
import { CreateUserHandler } from './Commands/Handlers/create-user.handler';
import { RemoveUserHandler } from './Commands/Handlers/remove-user.handler';

@Module({
  // imports: [CqrsModule],
  providers: [CheckPermissionHandler, CreateUserHandler, RemoveUserHandler],
  exports: [CheckPermissionHandler, CreateUserHandler, RemoveUserHandler],
})
export class ApplicationModule {}
