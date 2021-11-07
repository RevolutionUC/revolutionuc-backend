import { IsNotEmpty, IsString } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category, CategoryId } from '../category/category.entity';
import { Judge } from '../judge/judge.entity';

export type GroupId = string & { readonly __typename: 'GroupId' };

@Entity()
export class Group {
  static create(name: string, category: Category) {
    const group = new Group();

    group.id = uuid() as GroupId;
    group.name = name;
    group.categoryId = category.id;

    return group;
  }

  @PrimaryGeneratedColumn('uuid')
  id: GroupId;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @Column({ nullable: true })
  categoryId: CategoryId;

  @OneToMany(() => Judge, (judge) => judge.group)
  judges?: Judge[];

  @ManyToOne(() => Category, (category) => category.groups)
  @JoinColumn({ name: 'categoryId' })
  category?: Category;
}
