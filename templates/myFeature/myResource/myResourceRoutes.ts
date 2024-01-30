import express from 'express';

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from './myResourceController';
import catchAsyncErrors from 'src/features/shared/middleware/ErrorCatcherMiddleware/catchAsyncErrors';

const router = express.Router();

router.get('/tasks', catchAsyncErrors(getTasks));
router.post('/task', catchAsyncErrors(createTask));
router.put('/task/:_id', catchAsyncErrors(updateTask));
router.delete('/task/:_id', catchAsyncErrors(deleteTask));

export default router;
