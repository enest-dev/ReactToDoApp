import * as admin from 'firebase-admin';
import { ServiceResponse } from '../models';
import { Http } from './Api.service';
import { config } from './../config/config';

class Firebase {
  serviceResponse = new ServiceResponse();

  async verifyIdToken(idToken): Promise<ServiceResponse<any>> {
    try {
      // idToken comes from the client app
      const user = await admin.auth().verifyIdToken(idToken);
      return this.serviceResponse.successResponse(user);
    } catch (error) {
      return this.serviceResponse.errorResponse(error.message);
    }
  }

  async sendPushNotification(userToken): Promise<ServiceResponse<any>> {
    console.log('userToken', userToken)
    const fcmUrl = 'https://fcm.googleapis.com/fcm/send';
    const headers = {
      Authorization: `key = ${config.firebaseServerKey}`
    }
    console.log(headers);
    const bodyData = {
      "notification": {
        "title": "To do App Notification",
        "body": "You have assigned new task",
        "click_action": "http://localhost:3000/",
        "icon": "http://url-to-an-icon/icon.png"
      },
      "to": userToken
    }
    try {
      const http = new Http({ headers });
      await http.post(fcmUrl, bodyData);
      return this.serviceResponse.successResponse(true);
    } catch (error) {
      console.log(error);
      return this.serviceResponse.errorResponse(error);
    }
  }

}

export default new Firebase();
