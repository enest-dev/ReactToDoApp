import { ServiceResponse } from '../models';
import { UserModel } from '../mongoose/Users.model';

class UserService {
  serviceResponse = new ServiceResponse();

  async getUserProfileById(userId): Promise<ServiceResponse<any>> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return this.serviceResponse.errorResponse('User Not found');
      }
      return this.serviceResponse.successResponse(user);
    } catch (error) {
      return this.serviceResponse.errorResponse(error.message);
    }
  }

  async getUsersList(): Promise<ServiceResponse<any>> {
    try {
      const usersLists = await UserModel.find().select("name");
      if (!usersLists) {
        return this.serviceResponse.errorResponse('Users Not found');
      }
      return this.serviceResponse.successResponse(usersLists);
    } catch (error) {
      return this.serviceResponse.errorResponse(error.message);
    }
  }

  async setNotificationToken(notificationToken, userId): Promise<ServiceResponse<any>> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return this.serviceResponse.errorResponse('Users Not found');
      }
      Object.assign(user, { notificationToken });
      await user.save();
      return this.serviceResponse.successResponse('Success');
    } catch (error) {
      return this.serviceResponse.errorResponse(error.message);
    }
  }


}

export default new UserService();
