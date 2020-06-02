import * as HttpStatus from 'http-status-codes';

import { Request, Response } from '../interfaces/Express';
import { taskService } from '../services';

export class TasksController {

  public async createTask(req: Request, res: Response) {

    if (!req.body?.title) {
      res.status(HttpStatus.BAD_REQUEST).send('Title is required');
      return
    }

    const addTaskResponse = await taskService.createTask(req.body, req.userId);
    if (!addTaskResponse.isSuccess) {
      res.status(HttpStatus.NOT_FOUND).send(addTaskResponse.errorMessage);
      return;
    }
    return res.send(addTaskResponse.data);
  }

  public async updateTask(req: Request, res: Response) {

    if (!req.body?.title) {
      res.status(HttpStatus.BAD_REQUEST).send('Title is required');
      return
    }

    const addTaskResponse = await taskService.updateTask(req.body, req.userId);
    if (!addTaskResponse.isSuccess) {
      res.status(HttpStatus.NOT_FOUND).send(addTaskResponse.errorMessage);
      return;
    }
    return res.send(addTaskResponse.data);
  }

  public async deleteTask(req: Request, res: Response) {
    const deletedTaskResponse = await taskService.deleteTask(req.params.taskId);
    if (!deletedTaskResponse.isSuccess) {
      res.status(HttpStatus.NOT_FOUND).send(deletedTaskResponse.errorMessage);
      return;
    }
    return res.send(deletedTaskResponse.data);
  }

  public async getTaskListByUser(req: Request, res: Response) {
    const tasksResponse = await taskService.getTaskListsByUser(req.userId);
    if (!tasksResponse.isSuccess) {
      res.status(HttpStatus.NOT_FOUND).send(tasksResponse.errorMessage);
      return;
    }
    return res.send(tasksResponse.data);
  }

  public async getMyAssignedTasks(req: Request, res: Response) {
    const tasksResponse = await taskService.getTaskListsByUser(req.userId);
    if (!tasksResponse.isSuccess) {
      res.status(HttpStatus.NOT_FOUND).send(tasksResponse.errorMessage);
      return;
    }
    return res.send(tasksResponse.data);
  }
}
