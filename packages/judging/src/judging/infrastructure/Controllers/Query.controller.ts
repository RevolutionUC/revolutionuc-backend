import { Controller } from '@nestjs/common';
import { QueryHandler } from 'src/judging/application/Queries/Query.handler';
import { SERVICE_TOKENS } from '@revuc/contract';
import {
  Tokens as Queries,
  Props,
  Response,
} from '@revuc/contract/judging/queries';
import { QueryFactory } from '@revuc/microservices/lib';

const Query = QueryFactory(SERVICE_TOKENS.JUDGING);

@Controller()
export class QueryController {
  constructor(private readonly handler: QueryHandler) {}

  @Query(Queries.CATEGORIES)
  async categories(): Promise<Response[typeof Queries.CATEGORIES]> {
    const categories = await this.handler.categories();
    return { categories };
  }

  @Query(Queries.JUDGES)
  async judges(): Promise<Response[typeof Queries.JUDGES]> {
    const judges = await this.handler.judges();
    return { judges };
  }

  @Query(Queries.PROJECTS)
  async projects(): Promise<Response[typeof Queries.PROJECTS]> {
    const projects = await this.handler.projects();
    return { projects };
  }

  @Query(Queries.GROUPS)
  async groups(): Promise<Response[typeof Queries.GROUPS]> {
    const groups = await this.handler.groups();
    return { groups };
  }

  @Query(Queries.SCORED_SUBMISSIONS)
  async scoredSubmissions(): Promise<
    Response[typeof Queries.SCORED_SUBMISSIONS]
  > {
    const submissions = await this.handler.scoredSubmissions();
    return { submissions };
  }

  @Query(Queries.JUDGE)
  async judge(
    dto: Props[typeof Queries.JUDGE],
  ): Promise<Response[typeof Queries.JUDGE]> {
    const judge = await this.handler.judge(dto.judgeId);
    return { judge };
  }

  @Query(Queries.GET_SUBMISSIONS)
  async getSubmissions(
    dto: Props[typeof Queries.GET_SUBMISSIONS],
  ): Promise<Response[typeof Queries.GET_SUBMISSIONS]> {
    const submissions = await this.handler.getSubmissions(dto.judgeId);
    return { submissions };
  }
}
