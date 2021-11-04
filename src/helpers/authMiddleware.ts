import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services';

const authService = new AuthService();

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
      throw new Error('Missing JWT Token');
    }

    const isAuthorized = await authService.isAuthorized(jwtToken);
    if (!isAuthorized) {
      throw new Error('Authentication error');
    }
  } catch (error) {
    next(error);
  }

  next();
};

export default authentication;
