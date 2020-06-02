import { toast } from 'react-toastify';
import { Http } from "@services";
import { url } from "./ApiEndpoints";
import { User } from "src/Models/User.model";

export const dataService = {
  getToDoTaskLists,
  deleteToDoTask,
  upsertTask,
  getAllUsers,
  getUserProfile,
  setupNotification
};


async function getToDoTaskLists() {
  try {
    const http = new Http({});
    const response = await http.get(url.getTasks);
    return response.data;
  } catch (error) {
    return [];
  }
}

async function deleteToDoTask(taskId) {
  try {
    const http = new Http({});
    const response = await http.delete(`${url.deleteToDoTask}/${taskId}`);
    toast.success('Task Deleted Successfully');
    return response.data;
  } catch (error) {
    return '';
  }
}

async function upsertTask(taskData) {
  const http = new Http({});
  try {
    if (!taskData.assignedTo) {
      taskData.assignedTo = null;
    }
    if (taskData.id) {
      await http.put(url.updateToDoTask, taskData);
      toast.success('Task Updated Successfully');
      return true
    }
    await http.post(url.addToDoTask, taskData);
    toast.success('Task Created Successfully');
    return true;
  } catch (error) {
    return false
  }
}

async function getUserProfile(): Promise<User> {
  const http = new Http({});
  try {
    const response = await http.get(url.getUsersProfile);
    return response.data;
  } catch (error) {
    return null;
  }
}

async function setupNotification(notificationToken): Promise<User> {
  const http = new Http({});
  try {
    const response = await http.post(url.setupNotification, { notificationToken });
    return response.data;
  } catch (error) {
    return null;
  }
}

async function getAllUsers() {
  const http = new Http({});
  try {
    const response = await http.get(url.getUsers);
    return response.data;
  } catch (error) {
    return {}
  }
}