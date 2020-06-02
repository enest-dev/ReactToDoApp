import { authService } from '@services';
import * as firebase from "firebase";
import { firebaseConfig } from "../Config/firebase.config";
import { dataService } from '@services';

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  async signInWithGoogle(): Promise<string> {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      await firebase.auth().signInWithPopup(provider);
      return await firebase.auth().currentUser.getIdToken();
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async askForPermissionsToReceiveNotifications(): Promise<string> {
    try {
      const isLoggedIn = authService.isLoggedIn();
      if (!isLoggedIn) {
        return ''
      }
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      if (token) {
        await dataService.setupNotification(token);
      }
      console.log('token do usuário:', token);
      return token;
    } catch (error) {
      console.error(error);
      return ''
    }
  }

  async signOut() {
    firebase.auth().signOut();
  }
}

export default new Firebase();
