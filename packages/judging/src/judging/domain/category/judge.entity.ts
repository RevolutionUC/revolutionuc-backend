import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
} from 'class-validator';
import { Category } from './category.entity';
import { Group } from './group.entity';
import { Submission } from './submission.entity';

@Entity()
export class Judge {
  static RANK_TO_SCORE = [5, 4, 3, 2, 1];

  static create(name: string, email: string) {
    const judge = new Judge();

    judge.name = name;
    judge.email = email;

    return judge;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  rankings: Array<string>;

  @IsBoolean()
  @Column({ default: false })
  isFinal: boolean;

  @ManyToOne(() => Category, (category) => category.judges)
  category: Category;

  @ManyToOne(() => Group, (group) => group.judges)
  group: Group;

  rankSubmissions(submissions: Array<Submission>) {
    this.rankings = submissions.map((submission) => submission.id);
  }

  finalizeRanking() {
    this.isFinal = true;
  }

  scoreSubmissions(submissions: Array<Submission>) {
    submissions.forEach((submission, rank) => {
      const submissionId = this.rankings[rank];

      if (submissionId !== submission.id) {
        throw new Error(
          `Submission ${submission.id} does not match rank ${rank}`,
        );
      }

      const score = Judge.RANK_TO_SCORE[rank];
      submission.addScore(score);
    });
  }
}
