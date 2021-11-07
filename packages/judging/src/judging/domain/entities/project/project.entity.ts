import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { Submission } from '../submission/submission.entity';
import { ProjectDto } from '../../../application/dtos/project.dto';

export type ProjectId = string & { readonly __typename: 'ProjectId' };

@Entity()
export class Project {
  static create({ title, submitter, team, url }: ProjectDto): Project {
    const project = new Project();

    project.id = uuid() as ProjectId;
    project.title = title;
    project.submitter = submitter;
    project.team = team;
    project.url = url;

    return project;
  }

  @PrimaryGeneratedColumn('uuid')
  id: ProjectId;

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

  @OneToMany(() => Submission, (submission) => submission.project)
  submissions?: Submission[];

  disqualify(reason: string) {
    if (this.disqualified) {
      throw new Error('Project is already disqualified');
    }

    if (!reason) {
      throw new Error('Reason is required');
    }

    this.disqualified = reason;
  }

  requalify() {
    if (!this.disqualified) {
      throw new Error('Project is not disqualified');
    }

    this.disqualified = undefined;
  }
}
