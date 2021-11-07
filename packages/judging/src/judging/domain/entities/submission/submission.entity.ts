import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import {
  ArrayUnique,
  IsArray,
  IsDefined,
  IsInt,
  IsString,
} from 'class-validator';
import { Category, CategoryId } from '../category/category.entity';
import { Project, ProjectId } from '../project/project.entity';
import { Group, GroupId } from '../group/group.entity';

export type SubmissionId = string & { readonly __typename: 'SubmissionId' };

@Entity()
export class Submission {
  static create(category: Category, project: Project): Submission {
    const submission = new Submission();

    submission.id = uuid() as SubmissionId;
    submission.categoryId = category.id;
    submission.projectId = project.id;
    submission.score = 0;

    return submission;
  }

  static sort(submissions: Submission[], reverse?: boolean): Submission[] {
    const sortedSubmissions = [...submissions];
    sortedSubmissions.sort((a, b) => a.compareTo(b, reverse));

    return sortedSubmissions;
  }

  @PrimaryGeneratedColumn('uuid')
  id: SubmissionId;

  @IsDefined()
  @IsInt()
  @Column({ default: 0 })
  score: number;

  @IsDefined()
  @IsString()
  @Column({ nullable: false })
  projectId: ProjectId;

  @IsDefined()
  @IsString()
  @Column({ nullable: false })
  categoryId: CategoryId;

  @IsArray()
  @ArrayUnique()
  @Column('text', { array: true, nullable: true })
  groups?: GroupId[];

  @ManyToOne(() => Project, (project) => project.submissions)
  @JoinColumn({ name: 'projectId' })
  project?: Project;

  @ManyToOne(() => Category, (category) => category.submissions)
  @JoinColumn({ name: 'categoryId' })
  category?: Category;

  assignToGroup(group: Group) {
    if (this.categoryId !== group.categoryId) {
      throw new Error(`Submission does not belong to this group's category`);
    }

    this.groups = [...(this.groups || []), group.id];
  }

  // TODO: define sorting logic
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  compareTo(other: Submission, reverse?: boolean): number {
    return 0;
  }

  addScore(score: number): void {
    this.score += score;
  }
}
