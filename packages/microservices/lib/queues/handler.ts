import { applyDecorators, Logger } from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';

const logger = new Logger(`Event handler`);

export function Event<E = string>(event: E) {
  logger.log(`Subscribing to event ${event}`);

  return applyDecorators(MessagePattern(event, Transport.RMQ));
}
