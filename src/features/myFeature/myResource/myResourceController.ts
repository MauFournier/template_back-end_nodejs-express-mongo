import Task from './myResourceModel';
import {v4 as generateUUID} from 'uuid';
import {
  convertTaskDBResultToTaskObject,
  convertTaskDBResultsToTaskObjectArray,
} from './myResourceUtils';

const getTasks = async (req: any, res: any) => {
  const userId = req.query.userId;

  const tasks = await Task.find({userId});
  res.status(200).json({
    message: 'Tasks fetched!',
    data: convertTaskDBResultsToTaskObjectArray(tasks),
  });
};

const createTask = async (req: any, res: any) => {
  const {_id, title, status, userId} = req.body;

  const taskId = _id === undefined ? generateUUID() : _id;

  const newTask = {
    _id: taskId,
    title,
    status,
    userId,
  };

  const existingTaskWithSpecifiedId = await Task.findById(taskId);

  if (existingTaskWithSpecifiedId !== null) {
    res.status(409).json({message: 'Task with specified ID already exists'});
  } else {
    const task = new Task(newTask);

    await task.save();
    res.status(201).json({
      message: 'Task created!',
      data: convertTaskDBResultToTaskObject(task),
    });
  }
};

const updateTask = async (req: any, res: any) => {
  const {title, status, userId} = req.body;
  const taskId = req.params._id;

  let oldCategory: string | undefined = '';
  const task = await Task.findById(taskId);

  if (task !== null) {
    title !== undefined && (task.title = title);
    status !== undefined && (task.status = status);
    userId !== undefined && (task.userId = userId);

    await task.save();

    res.status(200).json({
      message: 'Task updated!',
      data: convertTaskDBResultToTaskObject(task),
    });
  } else {
    res.status(404).json({message: 'Task not found'});
  }
};

const deleteTask = async (req: any, res: any) => {
  const taskId = req.params._id;
  const userId = req.query.userId;

  const deletedTask = await Task.findByIdAndDelete({_id: taskId, userId});

  if (deletedTask) {
    res.status(200).json({message: 'Task deleted!'});
  } else {
    res.status(404).json({message: 'Task not found'});
  }
};

export {getTasks, createTask, updateTask, deleteTask};
