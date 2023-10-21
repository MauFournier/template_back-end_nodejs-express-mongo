import {user1} from '../../../../config/seedTestData/seedUsers';
import {useDatabase} from '../../../../config/test-setup';
import TaskModel from '../myResourceModel';

import {aTask1, aTask2} from '../../../../config/seedTestData/seedTasks';

import {Task, TaskStatus} from '../myResourceTypes';
import {
  convertTaskDBResultToTaskObject,
  convertTaskDBResultsToTaskObjectArray,
} from '../myResourceUtils';

useDatabase();

describe('taskUtils', () => {
  describe('convertTaskDBResultToTaskObject', () => {
    it('should convert a task database result to a Task object with correct properties', async () => {
      const result = await TaskModel.findOne({
        userId: user1._id,
        _id: aTask1._id,
      });

      let task: Task | null = null;
      if (result !== null) {
        task = convertTaskDBResultToTaskObject(result);
      }

      expect(task).toMatchObject(aTask1);

      if (task === null) {
        throw new Error('Task is null');
      }
      expect('__v' in task).toBe(false);
    });
  });

  describe('convertTaskDBResultsToTaskObjectArray', () => {
    it('should convert an array of task database results to an array of Task objects', async () => {
      const resultsPending = await TaskModel.find({
        userId: user1._id,
      });

      const tasksPending =
        convertTaskDBResultsToTaskObjectArray(resultsPending);

      expect(tasksPending[0]).toMatchObject(aTask1);
      expect(tasksPending[1]).toMatchObject(aTask2);
      expect(tasksPending.length).toBeGreaterThan(1);

      expect('__v' in tasksPending[0]).toBe(false);
      expect('__v' in tasksPending[1]).toBe(false);
    });

    it('should work with an array with 1 task database result', async () => {
      const results = await TaskModel.find({
        userId: user1._id,
        _id: aTask1._id,
      });

      const tasks = convertTaskDBResultsToTaskObjectArray(results);

      expect(tasks[0]).toMatchObject(aTask1);
      expect(tasks.length).toBe(1);
    });
  });
});
