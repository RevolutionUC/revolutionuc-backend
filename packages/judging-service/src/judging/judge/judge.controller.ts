import { Body, Controller, Get, Put } from '@nestjs/common';
import { JudgeService } from './judge.service';
import { CurrentUser, CurrentUserDto } from 'src/auth/currentuser';
import { UseAuth } from 'src/auth/auth.decorator';
import { Judge } from '../domain/aggregates/category/judge.entity';

@Controller('judge')
@UseAuth(['JUDGE'])
export class JudgeController {
  constructor(private readonly judgeService: JudgeService) {}

  @Get(`me`)
  getJudgeDetails(@CurrentUser() user: CurrentUserDto): Promise<Judge> {
    return this.judgeService.getJudgeDetails(user.id);
  }

  @Put(`rankings`)
  rankSubmissions(
    @CurrentUser() user: CurrentUserDto,
    @Body() data: { rankings: Array<string> },
  ): Promise<Judge> {
    return this.judgeService.rankSubmissions(user.id, data.rankings);
  }

  @Put(`isFinal`)
  submitRanking(@CurrentUser() user: CurrentUserDto): Promise<void> {
    return this.judgeService.submitRanking(user.id);
  }
}
