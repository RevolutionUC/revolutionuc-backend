import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Judge } from './judge.entity';
import { Submission } from './submission.entity';
import { Group } from './group.entity';
import { groupNameGenerator, shuffleArray } from 'src/util';
import { Project } from '../project/project.entity';
import { CategoryDto } from 'src/judging/dtos/category.dto';

@Entity()
export class Category {
  static create({
    name,
    groupCount,
    groupsPerSubmission,
    mandatory,
  }: CategoryDto) {
    const category = new Category();

    category.name = name;
    category.groupCount = groupCount;
    category.groupsPerSubmission = groupsPerSubmission;
    category.mandatory = !!mandatory;

    return category;
  }

  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  groupCount: number;

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
  judges: Judge[];

  @OneToMany(() => Group, (group) => group.category, { cascade: true })
  groups: Group[];

  @OneToMany(() => Submission, (score) => score.category, { cascade: true })
  submissions: Submission[];

  assignJudge(judge: Judge) {
    this.judges.push(judge);
  }

  removeJudge(judge: Judge) {
    this.judges = this.judges.filter((j) => j.id !== judge.id);
  }

  maximumSubmissions() {
    const { groupsPerSubmission, groupCount, submissions } = this;
    const submissionCount = submissions.length;

    const judgingSessionCount = submissionCount * groupsPerSubmission;

    const judgingSessionsPerGroup = Math.ceil(judgingSessionCount / groupCount);

    return judgingSessionsPerGroup;
  }

  assignSubmissionsToGroups() {
    const { groups, submissions } = this;
    const shuffledSubmissions = shuffleArray(submissions);

    // Start assignment with the first group
    let groupIndex = 0;

    // Start assigning submissions
    for (let i = 0; i < this.groupsPerSubmission; i++) {
      // Go through the list of submissions k times
      shuffledSubmissions.forEach((submission) => {
        const group = groups[groupIndex];
        if (!group.canAssignSubmission()) {
          group.sortSubmissions();

          groupIndex++;
        }

        const nextGroup = groups[groupIndex];

        nextGroup.assignSubmission(submission);
      });
    }
  }

  assignJudgesToGroups() {
    const { groups, judges } = this;
    const shuffledJudges = shuffleArray(judges);

    // Start assignment with the first group again
    let groupIndex = 0;

    // Go through the list of judges
    shuffledJudges.forEach((judge) => {
      const group = groups[groupIndex];
      // if the current group is full
      if (!group.canAssignJudge()) {
        // Next group
        groupIndex++;
      }

      const nextGroup = groups[groupIndex];

      // Assign the judge to the current group
      nextGroup.assignJudge(judge);
    });
  }

  createGroups() {
    const groupNames = groupNameGenerator(this.groupCount);

    this.groups = groupNames.map((name) => {
      return Group.create(name, this);
    });

    this.assignSubmissionsToGroups();
    this.assignJudgesToGroups();
  }

  submitProject(project: Project) {
    const submission = new Submission();
    submission.category = this;
    submission.projectId = project.id;

    this.submissions.push(submission);
  }

  scoreSubmissions() {
    this.groups.forEach((group) => {
      group.scoreSubmissions();
    });
  }
}
