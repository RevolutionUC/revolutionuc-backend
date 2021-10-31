import { Controller } from '@nestjs/common';
import { CommandHandler } from 'src/judging/application/Commands/Command.handler';
import { Tokens as Commands, Props } from '@revuc/contract/judging/commands';
import { Command } from './handlers';

@Controller()
export class CommandController {
  constructor(private readonly handler: CommandHandler) {}

  @Command(Commands.SUBMIT_PROJECTS)
  async submitProjects(
    dto: Props[typeof Commands.SUBMIT_PROJECTS],
  ): Promise<void> {
    return this.handler.submitProjects(dto);
  }

  @Command(Commands.CREATE_CATEGORY)
  async createCategory(
    dto: Props[typeof Commands.CREATE_CATEGORY],
  ): Promise<void> {
    return this.handler.createCategory(dto);
  }

  @Command(Commands.REGISTER_JUDGE)
  async registerJudge(
    dto: Props[typeof Commands.REGISTER_JUDGE],
  ): Promise<void> {
    return this.handler.registerJudge(dto);
  }

  @Command(Commands.REMOVE_JUDGE)
  async removeJudge(dto: Props[typeof Commands.REMOVE_JUDGE]): Promise<void> {
    return this.handler.removeJudge(dto.categoryId, dto.judgeId);
  }

  @Command(Commands.REASSIGN_JUDGE)
  async reassignJudge(
    dto: Props[typeof Commands.REASSIGN_JUDGE],
  ): Promise<void> {
    return this.handler.reassignJudge(
      dto.judgeId,
      dto.formCategoryId,
      dto.toCategoryId,
    );
  }

  async uploadDevpostCsv(file: Express.Multer.File): Promise<void> {
    return this.handler.uploadDevpostCsv(file);
  }

  @Command(Commands.DISQUALIFY_PROJECT)
  async disqualifyProject(
    dto: Props[typeof Commands.DISQUALIFY_PROJECT],
  ): Promise<void> {
    return this.handler.disqualifyProject(dto.projectId, dto.reason);
  }

  @Command(Commands.REQUALIFY_PROJECT)
  async requalifyProject(
    dto: Props[typeof Commands.REQUALIFY_PROJECT],
  ): Promise<void> {
    return this.handler.requalifyProject(dto.projectId);
  }

  @Command(Commands.CREATE_JUDGING_GROUPS)
  async createJudgingGroups(): Promise<void> {
    return this.handler.createJudgingGroups();
  }

  @Command(Commands.SCORE_SUBMISSIONS)
  async scoreSubmissions(): Promise<void> {
    return this.handler.scoreSubmissions();
  }

  @Command(Commands.RANK_SUBMISSIONS)
  async rankSubmissions(
    dto: Props[typeof Commands.RANK_SUBMISSIONS],
  ): Promise<void> {
    return this.handler.rankSubmissions(
      dto.categoryId,
      dto.judgeId,
      dto.rankings,
    );
  }

  @Command(Commands.FINALIZE_RANKING)
  async finalizeRanking(
    dto: Props[typeof Commands.FINALIZE_RANKING],
  ): Promise<void> {
    return this.handler.finalizeRanking(dto.categoryId, dto.judgeId);
  }
}
