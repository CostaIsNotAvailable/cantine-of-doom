import { Request, Response, NextFunction } from 'express';
import { Credentials, JwtToken } from '../../models';

export interface IAuthService {
  login(credentials: Credentials): Promise<JwtToken | undefined>;
  isAuthorized(jwtToken: string): Promise<boolean>;
}
