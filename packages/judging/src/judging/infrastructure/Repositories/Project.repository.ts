import { Project } from 'src/judging/domain/project/project.entity';
import { EntityRepository, AbstractRepository } from 'typeorm';

@EntityRepository(Project)
export class ProjectRepository extends AbstractRepository<Project> {
  findById(id: string): Promise<Project> {
    return this.repository.findOne(id);
  }

  findAll(): Promise<Project[]> {
    return this.repository.find();
  }

  save(project: Project): Promise<Project> {
    return this.repository.save(project);
  }

  saveAll(projects: Project[]): Promise<Project[]> {
    return this.repository.save(projects);
  }
}
