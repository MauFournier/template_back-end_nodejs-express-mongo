import {aTask1, aTask2} from '../../config/seedTestData/seedTasks';
import {
  addFakeUndefinedMongoVersioningField,
  removeMongoVersionFields,
  removeMongoVersionFieldsFromSingleRecord,
} from './utils';

describe('Shared Utils', () => {
  describe('removeMongoVersionFieldsFromSingleRecord', () => {
    it('should remove the __v field from a single record', async () => {
      const task = {
        ...aTask1,
        __v: 0,
      };

      const taskWithoutMongoVersioningField =
        removeMongoVersionFieldsFromSingleRecord(task);

      expect('__v' in taskWithoutMongoVersioningField).toBe(false);
    });
  });

  describe('removeMongoVersionFields', () => {
    it('should remove the __v field from a single record', async () => {
      const task = {
        ...aTask1,
        __v: 0,
      };

      const taskWithoutMongoVersioningField = removeMongoVersionFields(task);

      expect('__v' in taskWithoutMongoVersioningField).toBe(false);
    });

    it('should remove the __v field from multiple records', async () => {
      const tasks = [
        {
          ...aTask1,
          __v: 0,
        },
        {
          ...aTask2,
          __v: 0,
        },
      ];

      const tasksWithoutMongoVersioningField = removeMongoVersionFields(tasks);

      expect('__v' in tasksWithoutMongoVersioningField[0]).toBe(false);
      expect('__v' in tasksWithoutMongoVersioningField[1]).toBe(false);
    });
  });

  describe('addFakeUndefinedMongoVersioningField', () => {
    it('should add a fake __v field', async () => {
      const task = {
        _id: 'id_task1',
        title: 'Example task 1',
        duration: 30,
        description: 'Example task 1 description',
        status: 'Pending',
        userId: 'id_user1',
        categoryId: 'id_exampleCategory1',
        createdAt: '2022-10-29T12:00:00.000Z',
        updatedAt: '2022-10-29T12:00:00.000Z',
        links: ['https://example.com'],
      };

      const taskWithFakeMongoVersioningField =
        addFakeUndefinedMongoVersioningField(task);

      expect(taskWithFakeMongoVersioningField).toEqual({
        ...task,
        __v: undefined,
      });
    });
  });
});
