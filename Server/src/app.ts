import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';

import { Routes } from './routes/Index';
import { config } from './config/config';
const swaggerDocument = require('./swagger/swagger.json');

class App {
  public app: express.Application;
  public routes: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routes.routes(this.app);
    this.mongoSetup();
    this.firebaseSetup();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    const corsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
    this.app.use(cors(corsOptions));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  // connect to mongo db instance
  private mongoSetup(): void {
    mongoose
      .connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('connection to mongodb success!');
      })
      .catch(error => {
        console.log('unable to connect to mongo db instance');
        console.log(error);
      });
  }

  private firebaseSetup(): void {
    const serviceAccount = require('./config/react-to-do-firebase-adminsdk.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://react-to-do-fe561.firebaseio.com',
    });
  }
}

export default new App().app;
