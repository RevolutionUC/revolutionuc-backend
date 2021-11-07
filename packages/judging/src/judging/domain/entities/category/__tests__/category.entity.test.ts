import * as faker from 'faker';
import { CategoryDto } from 'src/judging/application/dtos/category.dto';
import { Category } from '../category.entity';

describe(`Category`, () => {
  describe(`create`, () => {
    const categoryDto: CategoryDto = {
      name: faker.random.word(),
      groupsPerSubmission: faker.datatype.number(),
      judgesPerGroup: faker.datatype.number(),
      mandatory: faker.datatype.boolean(),
    };

    it(`returns an instance of Category model`, () => {
      const category = Category.create(categoryDto);

      expect(category).toBeInstanceOf(Category);
    });

    it(`returns object with the correct properties`, () => {
      const category = Category.create(categoryDto);

      expect(category.name).toBe(categoryDto.name);
      expect(category.groupsPerSubmission).toBe(
        categoryDto.groupsPerSubmission,
      );
      expect(category.judgesPerGroup).toBe(categoryDto.judgesPerGroup);
      expect(category.mandatory).toBe(categoryDto.mandatory);
    });
  });
});
