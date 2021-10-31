import { applyDecorators, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SERVICE_TOKENS, CQRS_TOKENS } from '@revuc/contract';

const { COMMAND_TOKEN, QUERY_TOKEN } = CQRS_TOKENS;

export const HandlerFactory = (token: keyof typeof SERVICE_TOKENS) => {
  const logger = new Logger(`${token} Handler`);
  logger.log(`Handlers created`);

  function Command<C = string>(command: C) {
    logger.log(`Registered command ${command}`);

    return applyDecorators(
      MessagePattern(`${token}.${COMMAND_TOKEN}.${command}`),
    );
  }

  function Query<Q = string>(query: Q) {
    logger.log(`Registered query ${query}`);

    return applyDecorators(MessagePattern(`${token}.${QUERY_TOKEN}.${query}`));
  }

  return { Command, Query };
};
