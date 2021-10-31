import { applyDecorators } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { COMMAND_TOKEN, QUERY_TOKEN } from '@revuc/contract';
import { Commands } from '@revuc/contract/judging/commands';
import { Queries } from '@revuc/contract/judging/queries';

export const CommandFactory =
  (token: string) => (command: keyof typeof Commands) =>
    applyDecorators(MessagePattern(`${token}.${COMMAND_TOKEN}.${command}`));

export const QueryFactory = (token: string) => (query: keyof typeof Queries) =>
  applyDecorators(MessagePattern(`${token}.${QUERY_TOKEN}.${query}`));
