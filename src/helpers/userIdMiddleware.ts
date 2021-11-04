import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services';

const authService = new AuthService();

const userIdCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
      throw new Error('Missing JWT Token');
    }

    const payload = await authService.getTokenPayload(jwtToken);
    if (req.body.userId) {
      req.body.userId = payload.id.toString();
    }
  } catch (error) {
    next(error);
  }

  next();
};

export default userIdCheck;
