export interface Task {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  title: string;
  status: TaskStatus;
}

export enum TaskStatus {
  Pending = 'Pending',
  Done = 'Done',
  Snoozed = 'Snoozed',
}
