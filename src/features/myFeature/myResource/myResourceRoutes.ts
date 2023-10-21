import express from 'express';

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from './myResourceController';

const router = express.Router(); //router is like a mini express app, that we can plug into app.use()

router.get('/tasks', getTasks);
router.post('/task', createTask);
router.put('/task', updateTask);
router.delete('/task', deleteTask);

export default router;
