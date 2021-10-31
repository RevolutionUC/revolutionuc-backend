export interface CategoryDTO {
  id: string;
  name: string;
  groupCount: number;
  groupsPerSubmission: number;
  judgesPerGroup: number;
  mandatory: boolean;
}

export interface JudgeDTO {
  id: string;
  name: string;
  email: string;
  rankings: string[];
  isFinal: boolean;
  category: CategoryDTO;
}

export interface ProjectDTO {
  id: string;
  title: string;
  url: string;
  submitter: string;
  team: string[];
  disqualified?: string;
}

export interface GroupDTO {
  id: string;
  name: string;
  judges: JudgeDTO[];
  category: CategoryDTO;
  submissions: SubmissionDTO[];
}

export interface SubmissionDTO {
  id: string;
  projectId: string;
  score: number;
}
