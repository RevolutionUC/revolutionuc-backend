import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ProjectDto } from 'src/judging/application/dtos/project.dto';

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

  disqualify(reason: string) {
    this.disqualified = reason;
  }

  requalify() {
    this.disqualified = null;
  }
}
