import * as faker from 'faker';
import { Category } from '../../category/category.entity';
import { Group } from '../group.entity';

describe(`Group`, () => {
  describe(`create`, () => {
    const groupName: string = faker.random.word();
    const category: Category = new Category();

    it(`returns an instance of Group model`, () => {
      const group = Group.create(groupName, category);

      expect(group).toBeInstanceOf(Group);
    });

    it(`returns object with the correct properties`, () => {
      const group = Group.create(groupName, category);

      expect(group.name).toBe(groupName);
      expect(group.categoryId).toBe(category.id);
    });
  });
});
