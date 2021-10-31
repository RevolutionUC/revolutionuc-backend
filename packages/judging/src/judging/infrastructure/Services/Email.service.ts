import { Injectable } from '@nestjs/common';
import { SERVICE_TOKENS } from '@revuc/contract';
import { Microservice, MicroserviceClient } from '@revuc/microservices/lib';

@Injectable()
@Microservice(SERVICE_TOKENS.EMAIL)
export class EmailService extends MicroserviceClient {
  async sendEmail(dto: {
    email: string;
    template: string;
    data: any;
  }): Promise<void> {
    return this.sendCommand('send', dto);
  }
}
