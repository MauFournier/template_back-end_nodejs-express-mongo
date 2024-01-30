import request from 'supertest';
import {useDatabase} from 'src/config/test-setup';

import app from 'src/app';
import {aTask1, seedTestData_tasks} from 'src/config/seedTestData/seedTasks';
import {user1} from 'src/config/seedTestData/seedUsers';
import {TaskStatus} from 'src/features/myFeature/myResource/myResourceTypes';

useDatabase();

describe('taskController', () => {
  describe('getTasks', () => {
    it('should get tasks for a specific user', async () => {
      const getTasksResponse = await request(app)
        .get('/tasks')
        .query({userId: seedTestData_tasks[0].userId});
      expect(getTasksResponse.status).toBe(200);
      expect(getTasksResponse.body.data.length).toBeGreaterThan(0);
      expect(getTasksResponse.body.data[0]._id).toBe(seedTestData_tasks[0]._id);
    });

    it('should return 0 tasks if none are found for a specific user', async () => {
      const nonExistentUserId = 'nonExistentUserId';
      const getTasksResponse = await request(app)
        .get('/tasks')
        .query({userId: nonExistentUserId});
      expect(getTasksResponse.status).toBe(200);
      expect(getTasksResponse.body.data.length).toBe(0);
    });
  });

  describe('createTask', () => {
    const exampleNewTask1 = {
      _id: 'id_newTask1',
      userId: user1._id,
      title: 'Example new task 1',
      status: TaskStatus.Pending,
    };

    it('should create a new task with valid input data', async () => {
      const createTaskResponse = await request(app)
        .post('/task')
        .send(exampleNewTask1);

      expect(createTaskResponse.status).toBe(201);
      expect(createTaskResponse.body.data).toMatchObject(exampleNewTask1);

      const verificationResult = await request(app)
        .get('/tasks')
        .query({userId: seedTestData_tasks[0].userId});

      expect(verificationResult.status).toBe(200);
      expect(verificationResult.body.data.length).toBeGreaterThan(0);

      const newTask = verificationResult.body.data.find(
        (task: any) => task.title === exampleNewTask1.title,
      );

      expect(newTask).toBeTruthy();
      expect(newTask).toMatchObject(exampleNewTask1);
    });

    it('should generate a unique ID for the task if no ID is provided', async () => {
      const createTaskResponse = await request(app)
        .post('/task')
        .send({...exampleNewTask1, _id: undefined});

      expect(createTaskResponse.status).toBe(201);
      expect(createTaskResponse.body.data._id).toBeTruthy();

      const verificationResult = await request(app)
        .get('/tasks')
        .query({userId: seedTestData_tasks[0].userId});

      expect(verificationResult.status).toBe(200);
      expect(verificationResult.body.data.length).toBeGreaterThan(0);

      const newTask = verificationResult.body.data.find(
        (task: any) => task.title === exampleNewTask1.title,
      );

      expect(newTask).toBeTruthy();
      expect(newTask._id).not.toBe(exampleNewTask1._id);
    });

    it('should fail to create a new task with repeated ID', async () => {
      const createTaskResponse = await request(app)
        .post('/task')
        .send({...exampleNewTask1, _id: aTask1._id});

      expect(createTaskResponse.status).toBe(409);

      const verificationResult = await request(app)
        .get('/tasks')
        .query({userId: seedTestData_tasks[0].userId});

      expect(verificationResult.status).toBe(200);
      expect(verificationResult.body.data.length).toBeGreaterThan(0);

      const taskWithGivenId = verificationResult.body.data.find(
        (task: any) => task._id === aTask1._id,
      );

      expect(taskWithGivenId).toBeTruthy();
      expect(taskWithGivenId).toMatchObject(aTask1);
    });
  });

  describe('updateTask', () => {
    it('should update an existing task with valid input data', async () => {
      const taskToUpdate = seedTestData_tasks[0];

      const propertiesToUpdate = {
        title: 'Updated title',
        status: TaskStatus.Done,
      };

      const updatedTask = {
        ...taskToUpdate,
        ...propertiesToUpdate,
      };

      const updateTaskResponse = await request(app)
        .put(`/task/${updatedTask._id}`)
        .send(updatedTask);

      expect(updateTaskResponse.status).toBe(200);
      expect(updateTaskResponse.body.data).toMatchObject({
        ...updatedTask,
        updatedAt: expect.any(String),
      });

      const verificationResult = await request(app)
        .get('/tasks')
        .query({userId: taskToUpdate.userId});

      expect(verificationResult.status).toBe(200);
      expect(verificationResult.body.data.length).toBeGreaterThan(0);

      const newTask = verificationResult.body.data.find(
        (task: any) => task.title === updatedTask.title,
      );

      expect(newTask).toBeTruthy();
      expect(newTask).toMatchObject({
        ...updatedTask,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('should return status code 404 if the task to be updated is not found', async () => {
      const taskToUpdate = seedTestData_tasks[0];

      const propertiesToUpdate = {
        _id: 'nonExistentTaskId',
      };

      const updatedTask = {
        ...taskToUpdate,
        ...propertiesToUpdate,
      };

      const updateResponse = await request(app)
        .put(`/task/${updatedTask._id}`)
        .send(updatedTask);

      expect(updateResponse.status).toBe(404);
    });
  });

  describe('deleteTask', () => {
    it('should delete an existing task', async () => {
      const taskToDelete = seedTestData_tasks[0];

      const deleteResponse = await request(app)
        .delete(`/task/${taskToDelete._id}`)
        .query({userId: taskToDelete.userId});

      expect(deleteResponse.status).toBe(200);

      const verificationResult = await request(app)
        .get('/tasks')
        .query({userId: taskToDelete.userId});

      expect(verificationResult.status).toBe(200);
      expect(verificationResult.body.data.length).toBeGreaterThan(0);

      const deletedTask = verificationResult.body.data.find(
        (task: any) => task._id === taskToDelete._id,
      );

      expect(deletedTask).toBeFalsy();
    });

    it("should return an error if the task wasn't found", async () => {
      const nonExistentTaskId = 'nonExistentTaskId';

      const deleteResponse = await request(app)
        .delete(`/task/${nonExistentTaskId}`)
        .query({userId: user1});

      expect(deleteResponse.status).toBe(404);
    });
  });
});
