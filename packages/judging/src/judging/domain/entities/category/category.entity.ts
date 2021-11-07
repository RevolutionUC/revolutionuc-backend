import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { Group } from '../group/group.entity';
import { Judge } from '../judge/judge.entity';
import { Submission } from '../submission/submission.entity';
import { CategoryDto } from '../../../application/dtos/category.dto';

export type CategoryId = string & { readonly __typename: 'CategoryId' };

@Entity()
export class Category {
  static create({
    name,
    groupsPerSubmission,
    judgesPerGroup,
    mandatory,
  }: CategoryDto) {
    const category = new Category();

    category.id = uuid() as CategoryId;
    category.name = name;
    category.groupsPerSubmission = groupsPerSubmission;
    category.judgesPerGroup = judgesPerGroup;
    category.mandatory = !!mandatory;

    return category;
  }

  @PrimaryGeneratedColumn('uuid')
  id: CategoryId;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  groupsPerSubmission: number;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  judgesPerGroup: number;

  @IsBoolean()
  @Column({ default: false })
  mandatory: boolean;

  @OneToMany(() => Judge, (judge) => judge.category, { cascade: true })
  judges?: Judge[];

  @OneToMany(() => Group, (group) => group.category, { cascade: true })
  groups?: Group[];

  @OneToMany(() => Submission, (score) => score.category, { cascade: true })
  submissions?: Submission[];
}
