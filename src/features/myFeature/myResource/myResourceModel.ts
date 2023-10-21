import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {timestamps: true},
);

const TaskModel = mongoose.model('Task', taskSchema, 'tasks');

export default TaskModel;
