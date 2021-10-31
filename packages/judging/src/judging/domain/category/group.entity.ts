import { IsNotEmpty, IsString } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  Column,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';
import { Judge } from './judge.entity';
import { Submission } from './submission.entity';

@Entity()
export class Group {
  static create(name: string, category: Category) {
    const group = new Group();
    group.name = name;
    group.category = category;
    return group;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @OneToMany(() => Judge, (judge) => judge.group)
  judges: Judge[];

  @ManyToOne(() => Category, (category) => category.groups)
  category: Category;

  @ManyToMany(() => Submission)
  @JoinTable()
  submissions: Submission[];

  canAssignJudge() {
    const judgesPerGroup = this.category.judgesPerGroup;
    return this.judges.length < judgesPerGroup;
  }

  assignJudge(judge: Judge) {
    this.judges.push(judge);
  }

  canAssignSubmission() {
    const maximumSubmissions = this.category.maximumSubmissions();
    return this.submissions.length < maximumSubmissions;
  }

  assignSubmission(submission: Submission) {
    this.submissions.push(submission);
  }

  sortSubmissions() {
    this.submissions = Submission.sort(this.submissions);
  }

  scoreSubmissions() {
    this.judges.forEach((judge) => {
      const submissions = judge.rankings.map((ranking) =>
        this.submissions.find((submission) => submission.id === ranking),
      );

      judge.scoreSubmissions(submissions);
    });
  }
}
