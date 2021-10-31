import { Injectable } from '@nestjs/common';
import { ATTENDANCE } from '@revuc/contract/tokens/services';
import { Microservice, MicroserviceClient } from '@revuc/microservices/lib';

export const EMAIL_TOKEN = 'email';

@Injectable()
@Microservice(ATTENDANCE)
export class EmailService extends MicroserviceClient {
  async sendEmail(dto: {
    email: string;
    template: string;
    data: any;
  }): Promise<void> {
    return this.sendCommand('send', dto);
  }
}
