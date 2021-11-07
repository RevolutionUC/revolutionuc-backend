import { HandlerFactory, Event } from '@revuc/microservices/lib';
import { SERVICE_TOKENS } from '@revuc/contract';

const { Command, Query } = HandlerFactory(SERVICE_TOKENS.AUTH);

export { Command, Query, Event };
