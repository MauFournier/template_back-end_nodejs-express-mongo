import {
  Task,
  TaskStatus,
} from 'src/features/myFeature/myResource/myResourceTypes';

export const aTask1: Task = {
  _id: 'id_aTask1',
  title: 'Example task 1',
  userId: 'id_user1',
  status: TaskStatus.Pending,
  createdAt: '2020-10-29T12:00:00.000Z',
  updatedAt: '2020-10-29T12:00:00.000Z',
};

export const aTask2: Task = {
  _id: 'id_aTask2',
  title: 'Example task 2',
  status: TaskStatus.Done,
  userId: 'id_user1',
  createdAt: '2020-10-30T12:00:00.000Z',
  updatedAt: '2020-10-30T12:00:00.000Z',
};

export const seedTestData_tasks = [aTask1, aTask2];
