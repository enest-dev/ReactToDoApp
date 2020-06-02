import * as jwt from 'jsonwebtoken';
import * as HttpStatus from 'http-status-codes';

import { ServiceResponse } from '../models';
import { config } from '../config/config';

class JwtService {
  serviceResponse = new ServiceResponse();

  async createToken(user): Promise<ServiceResponse<any>> {
    console.log(user);
    try {
      // idToken comes from the client app
      // exp: Math.floor(Date.now() / 1000) + 60 * 60, data: user
      const token = await jwt.sign({ user: user }, config.secret);
      return this.serviceResponse.successResponse(token);
    } catch (error) {
      return this.serviceResponse.errorResponse(error.message, HttpStatus.CONFLICT);
    }
  }

  async verifyToken(idToken): Promise<ServiceResponse<any>> {
    try {
      // idToken comes from the client app
      const user = await jwt.verifyIdToken(idToken);
      return this.serviceResponse.successResponse(user);
    } catch (error) {
      return this.serviceResponse.errorResponse(error.message);
    }
  }
}

export default new JwtService();
