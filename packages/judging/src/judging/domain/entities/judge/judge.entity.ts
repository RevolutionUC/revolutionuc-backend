import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
} from 'class-validator';
import { v4 as uuid } from 'uuid';
import { Category, CategoryId } from '../category/category.entity';
import { Group, GroupId } from '../group/group.entity';
import { Submission, SubmissionId } from '../submission/submission.entity';

export type JudgeId = string & { readonly __typename: 'JudgeId' };

@Entity()
export class Judge {
  static create(name: string, email: string) {
    const judge = new Judge();

    judge.id = uuid() as JudgeId;
    judge.name = name;
    judge.email = email;
    judge.isFinal = false;

    return judge;
  }

  @PrimaryGeneratedColumn('uuid')
  id: JudgeId;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Column()
  email: string;

  @IsArray()
  @ArrayMaxSize(5)
  @ArrayUnique()
  @Column('text', { array: true, nullable: true })
  rankings: SubmissionId[];

  @IsBoolean()
  @Column({ default: false })
  isFinal: boolean;

  @Column({ nullable: false })
  categoryId: CategoryId;

  @Column({ nullable: false })
  groupId: GroupId;

  @ManyToOne(() => Category, (category) => category.judges)
  @JoinColumn({ name: 'categoryId' })
  category?: Category;

  @ManyToOne(() => Group, (group) => group.judges)
  @JoinColumn({ name: 'groupId' })
  group?: Group;

  assignToCategory(category: Category) {
    if (this.groupId) {
      throw new Error(
        'Judge must not be assigned to a group before assigning to a category',
      );
    }

    this.categoryId = category.id;
  }

  assignToGroup(group: Group) {
    if (!this.categoryId) {
      throw new Error(
        'Judge must be assigned to a category before assigning to a group',
      );
    }

    if (group.categoryId !== this.categoryId) {
      throw new Error('Judge and group must be in the same category');
    }

    this.groupId = group.id;
  }

  rankSubmissions(submissions: Submission[]) {
    if (this.isFinal) {
      throw new Error('Judge has already finalized ranking');
    }

    this.rankings = submissions.map((submission) => {
      if (!submission.groups?.includes(this.groupId)) {
        throw new Error(`Submission must be in judge's group`);
      }

      return submission.id;
    });
  }

  finalizeRanking() {
    this.isFinal = true;
  }
}
