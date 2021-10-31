import { Category } from '../../domain/category/category.entity';
import { Judge } from '../../domain/category/judge.entity';
import { Submission } from '../../domain/category/submission.entity';

export class GroupDto {
  name: string;
  judges: Judge[];
  category: Category;
  submissions: Submission[];
}
