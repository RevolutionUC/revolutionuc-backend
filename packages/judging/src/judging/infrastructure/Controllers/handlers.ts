import { HandlerFactory } from '@revuc/microservices/lib';
import { SERVICE_TOKENS } from '@revuc/contract';

const { Command, Query } = HandlerFactory(SERVICE_TOKENS.JUDGING);

export { Command, Query };
