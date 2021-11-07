import { Injectable } from '@nestjs/common';
import { QUEUE_TOKENS } from '@revuc/contract';
import { EMAILS } from '@revuc/contract/messages';
import { Queue, QueueClient } from '@revuc/microservices/lib';

@Injectable()
@Queue(QUEUE_TOKENS.EMAIL_QUEUE)
export class EmailService extends QueueClient {
  sendEmail(email: keyof typeof EMAILS.JUDGING, data: any) {
    return this.send(email, data);
  }
}
