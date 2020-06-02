import * as HttpStatus from 'http-status-codes';

import { Request, Response } from '../interfaces/Express';
import { userService, firebaseService } from '../services';

export class UsersController {
  // get user profile
  public async getMyProfile(req: Request, res: Response) {
    const userResponse = await userService.getUserProfileById(req.userId);
    if (!userResponse.isSuccess) {
      res.status(HttpStatus.NOT_FOUND).send(userResponse.errorMessage);
      return;
    }
    return res.send(userResponse.data);
  }

  public async getUsersList(req: Request, res: Response) {
    const users = await userService.getUsersList();
    if (!users.isSuccess) {
      res.status(HttpStatus.NOT_FOUND).send(users.errorMessage);
      return;
    }
    return res.send(users.data);
  }

  public async setNotificationToken(req: Request, res: Response) {
    if (!req.body || !req.body.notificationToken) {
      res.status(HttpStatus.NOT_FOUND).send('Please provide receiver notificationToken');
    }
    const { notificationToken } = req.body;
    const users = await userService.setNotificationToken(notificationToken, req.userId);

    if (!users.isSuccess) {
      res.status(HttpStatus.NOT_FOUND).send(users.errorMessage);
      return;
    }
    return res.send(users.data);
  }

  public async sendPushNotification(req: Request, res: Response) {
    if (!req.body || !req.body.notificationToken) {
      res.status(HttpStatus.NOT_FOUND).send('Please provide receiver notificationToken');
    }
    const response = await firebaseService.sendPushNotification(req.body.notificationToken);
    if (!response.isSuccess) {
      res.status(HttpStatus.NOT_FOUND).send(response.errorMessage);
      return;
    }
    return res.send(response.data);
  }

  // update user profile
  public updateUser(req: Request, res: Response) { }
}
