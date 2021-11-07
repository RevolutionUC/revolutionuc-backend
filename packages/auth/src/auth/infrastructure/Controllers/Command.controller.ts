import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  Tokens as Commands,
  Props as CommandProps,
} from '@revuc/contract/auth/commands';
import { Command } from './handlers';
import { ChangePasswordCommand } from '../../application/Commands/Impl';

@Controller()
export class CommandController {
  constructor(private readonly commandBus: CommandBus) {}

  @Command(Commands.CHANGE_PASSWORD)
  async changePassword(dto: CommandProps[typeof Commands.CHANGE_PASSWORD]) {
    const command = new ChangePasswordCommand(dto.token, dto.password);

    return this.commandBus.execute(command);
  }
}
