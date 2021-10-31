import { Category } from 'src/judging/domain/category/category.entity';
import { EntityRepository, AbstractRepository } from 'typeorm';

@EntityRepository(Category)
export class CategoryRepository extends AbstractRepository<Category> {
  private relations = [
    `judges`,
    `submissions`,
    `groups`,
    `group.judges`,
    `group.submissions`,
  ];

  findById(id: string): Promise<Category> {
    return this.repository.findOne(id, {
      relations: this.relations,
    });
  }

  findByName(name: string): Promise<Category> {
    return this.repository.findOne({ name }, { relations: this.relations });
  }

  findAll(): Promise<Category[]> {
    return this.repository.find({ relations: this.relations });
  }

  save(category: Category): Promise<Category> {
    return this.repository.save(category);
  }

  saveAll(categories: Category[]): Promise<Category[]> {
    return this.repository.save(categories);
  }
}
