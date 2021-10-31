import { applyDecorators, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SERVICE_TOKENS, CQRS_TOKENS } from '@revuc/contract';
import { Tokens as Commands } from '@revuc/contract/judging/commands';
import { Tokens as Queries } from '@revuc/contract/judging/queries';

const { COMMAND_TOKEN, QUERY_TOKEN } = CQRS_TOKENS;

export const HandlerFactory = (token: keyof typeof SERVICE_TOKENS) => {
  const logger = new Logger(`${token} Handler`);
  logger.log(`Handlers created`);

  const Command = (command: keyof typeof Commands) => {
    logger.log(`Registered command ${command}`);

    return applyDecorators(
      MessagePattern(`${token}.${COMMAND_TOKEN}.${command}`),
    );
  };

  const Query = (query: keyof typeof Queries) => {
    logger.log(`Registered query ${query}`);

    return applyDecorators(MessagePattern(`${token}.${QUERY_TOKEN}.${query}`));
  };

  return { Command, Query };
};
