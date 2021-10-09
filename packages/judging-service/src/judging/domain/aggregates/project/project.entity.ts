import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Submission } from '../category/submission.entity';
import { ProjectDto } from 'src/judging/dtos/project.dto';

@Entity()
export class Project {
  static create({ title, submitter, team, url }: ProjectDto): Project {
    const project = new Project();

    project.title = title;
    project.submitter = submitter;
    project.team = team;
    project.url = url;

    return project;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @Column()
  url: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  submitter: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @Column(`text`, { array: true, default: `{}` })
  team: string[];

  @IsString()
  @Column({ nullable: true })
  disqualified?: string;

  @OneToMany(() => Submission, (score) => score.project)
  submissions: Submission[];

  disqualify(reason: string) {
    this.disqualified = reason;
  }

  requalify() {
    this.disqualified = null;
  }
}
