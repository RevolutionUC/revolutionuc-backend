import { Category } from '../domain/aggregates/category/category.entity';
import { Judge } from '../domain/aggregates/category/judge.entity';
import { Submission } from '../domain/aggregates/category/submission.entity';

export class GroupDto {
  name: string;
  judges: Judge[];
  category: Category;
  submissions: Submission[];
}
