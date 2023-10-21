export enum DaysOfWeek {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}

export interface LinkAttachment {
  _id: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  userId: string;

  title?: string;
}
