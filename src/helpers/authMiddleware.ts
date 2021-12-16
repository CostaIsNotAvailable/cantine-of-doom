import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../models/extendedRequest';
import { AuthService } from '../services';

const authService = new AuthService();

const authentication = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
      throw new Error('Missing JWT Token');
    }

    const isAuthorized = await authService.isAuthorized(jwtToken);
    if (!isAuthorized) {
      throw new Error('Authentication error');
    }

    const userPayload = await authService.getTokenPayload(jwtToken);
    req.user = userPayload;
  } catch (error) {
    next(error);
  }

  next();
};

export default authentication;
