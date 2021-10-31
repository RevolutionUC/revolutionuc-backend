import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsInt, IsString } from 'class-validator';
import { Category } from './category.entity';

@Entity()
export class Submission {
  static sort(submissions: Submission[], reverse?: boolean): Submission[] {
    const sortedSubmissions = [...submissions];
    sortedSubmissions.sort((a, b) => a.compareTo(b, reverse));

    return sortedSubmissions;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Column()
  projectId: string;

  @IsInt()
  @Column({ default: 0 })
  score: number;

  @ManyToOne(() => Category, (cateogry) => cateogry.submissions)
  category: Category;

  // TODO: define sorting logic
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  compareTo(other: Submission, reverse?: boolean): number {
    // TODO: define sorting logic
    return 0;
  }

  addScore(score: number): void {
    this.score += score;
  }
}
