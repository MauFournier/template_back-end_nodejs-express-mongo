import {Task, TaskStatus} from '../myResourceTypes';
import {filterTasksLeavingPending, isTaskPending} from '../myResourceUtils';

describe('taskUtils', () => {
  const anyDate = new Date().toISOString();

  describe('filterTasksLeavingPending', () => {
    it('should filter an array of tasks leaving only pending tasks', async () => {
      const tasks: Task[] = [
        {
          _id: '001',
          title: 'Task 1',
          status: TaskStatus.Pending,
          userId: '456',
          createdAt: anyDate,
          updatedAt: anyDate,
        },
        {
          _id: '002',
          title: 'Task 2',
          status: TaskStatus.Pending,
          userId: '456',
          createdAt: anyDate,
          updatedAt: anyDate,
        },
        {
          _id: '003',
          title: 'Task 3',
          status: TaskStatus.Done,
          userId: '456',
          createdAt: anyDate,
          updatedAt: anyDate,
        },
      ];

      const pendingTasks = filterTasksLeavingPending(tasks);

      expect(pendingTasks.length).toBe(2);
      expect(pendingTasks[0]._id).toBe('001');
      expect(pendingTasks[1]._id).toBe('002');
    });
  });
});
