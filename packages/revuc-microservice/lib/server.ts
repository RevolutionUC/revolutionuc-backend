import { applyDecorators } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CQRS_TOKENS } from '@revuc/contract';
import { Tokens as Commands } from '@revuc/contract/judging/commands';
import { Tokens as Queries } from '@revuc/contract/judging/queries';

const { COMMAND_TOKEN, QUERY_TOKEN } = CQRS_TOKENS;

export const CommandFactory =
  (token: string) => (command: keyof typeof Commands) =>
    applyDecorators(MessagePattern(`${token}.${COMMAND_TOKEN}.${command}`));

export const QueryFactory = (token: string) => (query: keyof typeof Queries) =>
  applyDecorators(MessagePattern(`${token}.${QUERY_TOKEN}.${query}`));
