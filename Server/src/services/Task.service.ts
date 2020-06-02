import { UserModel } from './../mongoose/Users.model';
import { ServiceResponse } from '../models';
import { TaskModel } from '../mongoose/Tasks.model';
import { firebaseService } from './index';


class TaskService {
    serviceResponse = new ServiceResponse();

    async getTaskListsByUser(userId): Promise<ServiceResponse<any>> {
        try {
            const tasksList = await TaskModel.find({ createdBy: userId, isDeleted: false }).populate('assignedTo', { 'name': 1, 'email': 1 });
            return this.serviceResponse.successResponse(tasksList);
        } catch (error) {
            return this.serviceResponse.errorResponse(error.message);
        }
    }

    async getMyAssignedTasks(userId): Promise<ServiceResponse<any>> {
        try {
            const tasksList = await TaskModel.find({ assignedTo: userId, isDeleted: false }).populate('assignedTo', { 'name': 1, 'email': 1 });
            return this.serviceResponse.successResponse(tasksList);
        } catch (error) {
            return this.serviceResponse.errorResponse(error.message);
        }
    }

    async createTask(task, userId): Promise<ServiceResponse<any>> {
        try {
            let taskModel = new TaskModel();
            Object.assign(taskModel, {
                title: task.title,
                description: task.description,
                assignedTo: task.assignedTo,
                createdBy: userId,
                updatedOn: new Date().toISOString()
            });
            await taskModel.save();

            if (task?.assignedTo && userId !== task.assignedTo) {
                await this.sendNotification(task.assignedTo);
            }
            return this.serviceResponse.successResponse(taskModel);
        }
        catch (error) {
            return this.serviceResponse.errorResponse(error.message);
        }
    }

    async updateTask(task, userId): Promise<ServiceResponse<any>> {
        try {
            let taskModel = await TaskModel.findById(task.id);
            if (!taskModel) {
                return this.serviceResponse.errorResponse('Make sure you have provided correct task Id');
            }
            Object.assign(taskModel, {
                title: task.title,
                description: task.description,
                assignedTo: task.assignedTo,
                createdBy: userId,
                updatedOn: new Date().toISOString()
            });
            await taskModel.save();
            if (task?.assignedTo && userId !== task.assignedTo) {
                await this.sendNotification(task.assignedTo);
            }
            return this.serviceResponse.successResponse(taskModel);
        }
        catch (error) {
            return this.serviceResponse.errorResponse(error.message);
        }
    }

    async deleteTask(taskId): Promise<ServiceResponse<any>> {
        try {
            await TaskModel.updateOne({ _id: taskId }, { isDeleted: true });
            return this.serviceResponse.successResponse('Success');
        }
        catch (error) {
            return this.serviceResponse.errorResponse(error.message);
        }
    }

    async sendNotification(userId): Promise<string> {

        const user = await UserModel.findById(userId);

        if (!user) {
            console.log('user not found');
            return '';
        }
        try {
            const notificationToken = user['notificationToken'];
            if (!notificationToken) {
                return 'token not found';
            }
            await firebaseService.sendPushNotification(notificationToken);
        } catch (error) {
            return '';
        }
    }
}

export default new TaskService();
