import { Injectable } from '@nestjs/common';
import { Judge } from '../../domain/entities/judge/judge.entity';
import { ConfigService } from '../../infrastructure/Environment';
import { EventClient } from '../../infrastructure/Queues/Event.queue';

@Injectable()
export class EventEmitter {
  constructor(
    private readonly configService: ConfigService,
    private readonly client: EventClient,
  ) {}

  createUserForJudge(judge: Judge) {
    const JUDGE_PASSWORD = this.configService.get(`JUDGE_PASSWORD`);

    return this.client.emitEvent(`USER_CREATED`, {
      username: judge.email,
      password: JUDGE_PASSWORD,
      role: `JUDGE`,
      scope: judge.id,
    });
  }

  removeUserForJudge(judge: Judge) {
    return this.client.emitEvent(`USER_REMOVED`, {
      username: judge.email,
    });
  }
}
