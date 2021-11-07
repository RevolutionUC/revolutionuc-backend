import { Category } from '../../domain/category/category.entity';
import { Judge } from '../../domain/entities/judge/judge.entity';
import { Submission } from '../../domain/entities/submission/submission.entity';

export class GroupDto {
  name: string;
  judges: Judge[];
  category: Category;
  submissions: Submission[];
}
