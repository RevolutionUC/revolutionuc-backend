import { Injectable } from '@nestjs/common';
import { ATTENDANCE } from '@revuc/contract/tokens/services';
import { Microservice, MicroserviceClient } from '@revuc/microservices/lib';

export const AUTH_TOKEN = `auth`;

@Injectable()
@Microservice(ATTENDANCE)
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
