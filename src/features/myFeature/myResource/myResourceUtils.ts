import {Task, TaskStatus} from './myResourceTypes';
import {removeMongoVersionFields} from '../../shared/utils';

export const convertTaskDBResultToTaskObject = (dbResult: any): Task => {
  const taskObject = dbResult.toObject();
  let castTask = {
    ...taskObject,
    status: taskObject.status as TaskStatus,
  };

  castTask = removeMongoVersionFields(castTask);

  if (taskObject.createdAt !== undefined) {
    castTask.createdAt =
      taskObject.createdAt === '' ? null : taskObject.createdAt?.toISOString();
  }

  if (taskObject.updatedAt !== undefined) {
    castTask.updatedAt =
      taskObject.updatedAt === '' ? null : taskObject.updatedAt?.toISOString();
  }

  return castTask;
};

export const convertTaskDBResultsToTaskObjectArray = (dbResult: any[]) => {
  return dbResult.map(task => convertTaskDBResultToTaskObject(task));
};

export const filterTasksLeavingPending = (tasks: Task[]) =>
  tasks.filter(task => task.status === TaskStatus.Pending);

export const isTaskPending = (task: Task) => task.status === TaskStatus.Pending;
