import Task from '../../../models/taskModel.js';
import {v4 as generateUUID} from 'uuid';

const getTasks = async (req: any, res: any, next: any) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({message: 'Tasks fetched!', data: tasks});
  } catch (err) {
    res.status(500).json({message: 'Error while fetching tasks', err: err});
  }
};

const createTask = async (req: any, res: any, next: any) => {
  const {_id, title, description} = req.body;

  const id = _id === undefined ? generateUUID() : _id;

  try {
    const task = new Task({
      _id: id,
      title,
      description,
    });

    await task.save();
    res.status(201).json({message: 'Task created!', data: task});
  } catch (err) {
    res.status(500).json({message: 'Error while creating task', err: err});
  }
};

const updateTask = async (req: any, res: any, next: any) => {
  const {_id, title, description} = req.body;

  try {
    //if the task exists, update it. Otherwise, create a new one

    let task = await Task.findById(_id);
    if (task !== null) {
      task.title = title;
      task.description = description;
    } else {
      task = new Task({
        _id,
        title,
        description,
      });
    }

    await task.save();
    res.status(201).json({message: 'Task updated!', data: task});
  } catch (err) {
    res.status(500).json({message: 'Error while updating task', err: err});
  }
};

const deleteTask = async (req: any, res: any, next: any) => {
  const {_id} = req.body;

  try {
    await Task.findByIdAndDelete(_id);
    res.status(201).json({message: 'Task deleted!'});
  } catch (err) {
    res.status(500).json({message: 'Error while deleting task', err: err});
  }
};

export {getTasks, createTask, updateTask, deleteTask};
