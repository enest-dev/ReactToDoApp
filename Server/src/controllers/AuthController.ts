import * as HttpStatus from 'http-status-codes';
import { UserModel } from '../mongoose/Users.model';
import { Request, Response } from '../interfaces/Express';
import { firebaseService, jwtService } from '../services';

export class AuthController {
  public async googleLogin(req: Request, res: Response) {
    const { idToken } = req.body;
    if (!idToken) {
      res.status(400).send({ message: 'idToken is required!' });
    } else {
      try {
        const response = await firebaseService.verifyIdToken(idToken);
        if (!response.isSuccess) {
          return res.status(HttpStatus.BAD_REQUEST).send(response.errorMessage);
        }

        const { email, picture, name } = response.data;
        let user = await UserModel.findOne({ email: response.data.email });
        if (!user) {
          user = Object.assign(new UserModel(), { email, picture, name });
        }

        user = Object.assign(user, { lastLogin: new Date().toISOString() });
        await user.save();
        const tokenResponse = await jwtService.createToken(user);
        if (!tokenResponse.isSuccess) {
          return res.status(HttpStatus.NOT_FOUND).send(tokenResponse.errorMessage);
        }
        res.send({ accessToken: tokenResponse.data, user });
      } catch (error) {
        return res.status(HttpStatus.NOT_FOUND).send(error);
      }
    }
  }
}
