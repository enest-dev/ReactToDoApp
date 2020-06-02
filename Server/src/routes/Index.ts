import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UsersController } from '../controllers/UsersController';
import { AuthController } from '../controllers/AuthController';
import { config } from '../config/config';
import { TasksController } from '../controllers/TasksController';

export class Routes {
  public authController: AuthController = new AuthController();
  public usersController: UsersController = new UsersController();
  public tasksController: TasksController = new TasksController();


  public routes(app): void {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'GET request successfully!!!!',
      });
    });

    // Public routes
    // Auth end points
    app.route('/api/auth/login-with-google').post(this.authController.googleLogin);

    // validate user token
    app.use((req: Request, res: Response, next: NextFunction) => {
      const token = req.headers['authorization'] || req.headers['Authorization'];
      if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', error: err });
        req['userId'] = decoded.user.id;
        console.log('userId', decoded.user.id);
        next();
      });
    });
    // Private routes
    // Users end points
    app.route('/api/users').get(this.usersController.getUsersList)

    app.route('/api/users/me').get(this.usersController.getMyProfile).post(this.usersController.updateUser);
    app.route('/api/users/setup-notification').post(this.usersController.setNotificationToken);
    app.route('/api/users/push-notifications').post(this.usersController.sendPushNotification);

    // tasks 
    app.route('/api/tasks/add').post(this.tasksController.createTask);
    app.route('/api/tasks/update').put(this.tasksController.updateTask);
    app.route('/api/tasks/delete/:taskId').delete(this.tasksController.deleteTask);
    app.route('/api/tasks').get(this.tasksController.getTaskListByUser);
    app.route('/api/tasks/assigned').get(this.tasksController.getTaskListByUser);
  }
}
