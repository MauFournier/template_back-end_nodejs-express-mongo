import mongoose from 'mongoose';
import {TaskStatus} from './myResourceTypes';

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(TaskStatus),
    },
  },
  {timestamps: true},
);

const TaskModel = mongoose.model('Task', taskSchema, 'tasks');

export default TaskModel;
