import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';

import TaskModel from '../features/myFeature/myResource/myResourceModel';
import UserModel from '../features/auth/userModel';

import {Task} from '../features/myFeature/myResource/myResourceTypes';
import {User} from '../features/auth/userTypes';

import {seedTestData_tasks} from './seedTestData/seedTasks';
import {seedTestData_users} from './seedTestData/seedUsers';

let mongoServer: MongoMemoryServer | undefined;

export const setupTestDB = async (): Promise<void> => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start();
  const mongoUri = await mongoServer.getUri();

  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }

  await mongoose.connect(mongoUri);
};

export const teardownTestDB = async (): Promise<void> => {
  await mongoose.disconnect();
  await mongoServer?.stop();
};

export const clearTestDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.dropDatabase();
  }
};

export interface SeedTestData {
  tasks?: Task[];
  users?: User[];
}

export const seedTestData = async (seedData?: SeedTestData): Promise<void> => {
  const tasks =
    seedData?.tasks !== undefined ? seedData.tasks : seedTestData_tasks;
  const users =
    seedData?.users !== undefined ? seedData.users : seedTestData_users;

  await TaskModel.insertMany(tasks);
  await UserModel.insertMany(users);
};

export const useDatabase = (seedData?: SeedTestData) => {
  beforeAll(async () => {
    await setupTestDB();
  });

  beforeEach(async () => {
    await seedTestData(seedData);
  });

  afterEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });
};

export const useDatabaseForSingleTest = (seedData?: SeedTestData) => {
  beforeEach(async () => {
    await setupTestDB();
    await seedTestData(seedData);
  });

  afterEach(async () => {
    await clearTestDB();
    await teardownTestDB();
  });
};
