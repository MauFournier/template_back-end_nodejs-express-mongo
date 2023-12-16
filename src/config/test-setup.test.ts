import {user1, seedTestData_users} from './seedTestData/seedUsers';
import {aTask1, seedTestData_tasks} from './seedTestData/seedTasks';

import {useDatabaseForSingleTest} from './test-setup';
import UserModel from 'src/features/auth/userModel';
import TaskModel from 'src/features/myFeature/myResource/myResourceModel';

describe('Seeding', () => {
  const customTaskTitle = 'Custom task title';
  const customEmail = 'customEmail';

  describe('Default seed', () => {
    useDatabaseForSingleTest();

    it('should use the default seed if none is provided', async () => {
      const task = await TaskModel.findOne({_id: aTask1._id});
      expect(task).toBeDefined();
      expect(task?.title).toBe(aTask1.title);

      const user = await UserModel.findOne({_id: user1._id});
      expect(user).toBeDefined();
      expect(user?.email).toBe(user1.email);
    });
  });

  describe('Custom full seed', () => {
    const customFullSeed = {
      tasks: [{...aTask1, title: customTaskTitle}],
      users: [{...user1, email: customEmail}],
    };

    useDatabaseForSingleTest(customFullSeed);

    it('should use a full custom seed if one is provided with it for a single model', async () => {
      const task = await TaskModel.findOne({_id: aTask1._id});
      expect(task).toBeDefined();
      expect(task?.title).not.toBe(aTask1.title);
      expect(task?.title).toBe(customTaskTitle);

      const user = await UserModel.findOne({_id: user1._id});
      expect(user).toBeDefined();
      expect(user?.email).not.toBe(user1.email);
      expect(user?.email).toBe(customEmail);
    });
  });

  describe('Partial seed', () => {
    const partialSeed = {
      tasks: [{...aTask1, title: customTaskTitle}],
    };

    useDatabaseForSingleTest(partialSeed);

    it('should use a partial custom seed if one is provided with it', async () => {
      const task = await TaskModel.findOne({_id: aTask1._id});
      expect(task).toBeDefined();
      expect(task?.title).not.toBe(aTask1.title);
      expect(task?.title).toBe(customTaskTitle);

      const user = await UserModel.findOne({_id: user1._id});
      expect(user).toBeDefined();
      expect(user?.email).toBe(user1.email);
    });
  });
});
