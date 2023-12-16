import {useDatabase} from 'src/config/test-setup';

useDatabase();

describe('taskQueries', () => {
  describe('exampleQuery', () => {
    it('should fetch pending tasks with due date on a specific date', async () => {
      // const dueDate = taskDueToday.dueDate;
      // if (dueDate === undefined) {
      //   throw new Error("Example task's due date is undefined");
      // }
      // const tasks = await getTasksDueOnDate(
      //   new Date(dueDate),
      //   taskDueToday.userId,
      // );
      // expect(tasks.length).toBeGreaterThanOrEqual(1);
      // const taskIndex = tasks.findIndex(task => task._id === taskDueToday._id);
      // if (taskIndex < 0) {
      //   throw new Error('Example task not found in results');
      // }
      // expect(tasks[taskIndex]).toMatchObject(taskDueToday);
    });

    it('should fetch pending tasks with snoozeUntil date on a specific date', async () => {
      // const snoozedUntil = taskSnoozedUntilToday.snoozedUntil;
      // if (snoozedUntil === undefined) {
      //   throw new Error("Example task's snoozedUntil date is undefined");
      // }
      // const tasks = await getTasksDueOnDate(
      //   new Date(snoozedUntil),
      //   taskSnoozedUntilToday.userId,
      // );
      // expect(tasks.length).toBeGreaterThanOrEqual(1);
      // const taskIndex = tasks.findIndex(
      //   task => task._id === taskSnoozedUntilToday._id,
      // );
      // if (taskIndex < 0) {
      //   throw new Error('Example task not found in results');
      // }
      // expect(tasks[taskIndex]).toMatchObject(taskSnoozedUntilToday);
    });

    it('should return an empty array when no tasks are due on the specified date', async () => {
      // const tasks = await getTasksDueOnDate(
      //   new Date('1990-01-01T00:00:00.000Z'),
      //   taskWithDueAndSnoozeDate.userId,
      // );
      // expect(tasks.length).toBe(0);
    });

    it('should return an empty array when no tasks are completed on the specified date', async () => {
      // const tasks = await getTasksCompletedOnDate(
      //   new Date('1990-01-01T00:00:00.000Z'),
      //   taskWithDueAndSnoozeDate.userId,
      // );
      // expect(tasks.length).toBe(0);
    });
  });
});
