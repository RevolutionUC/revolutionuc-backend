import { Injectable } from '@nestjs/common';
import { SERVICE_TOKENS } from '@revuc/contract';
import { Microservice, MicroserviceClient } from '@revuc/microservices/lib';

@Injectable()
@Microservice(SERVICE_TOKENS.AUTH)
export class AuthService extends MicroserviceClient {
  async register(dto: {
    username: string;
    password: string;
    role: string;
    scope: string;
  }): Promise<void> {
    return this.sendCommand('create-user', dto);
  }

  async unregister(dto: { username: string }): Promise<void> {
    return this.sendCommand('remove-user', dto);
  }
}
