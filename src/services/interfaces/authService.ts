import { Credentials, JwtToken, JwtTokenPayload } from '../../models';
import { Request } from 'express';

export interface IAuthService {
  login(credentials: Credentials): Promise<JwtToken | undefined>;
  isAuthorized(jwtToken: string): Promise<boolean>;
  getTokenPayload(jwtToken: string): Promise<JwtTokenPayload>;
  getUserIdFromRequest(request: Request): Promise<number | undefined>;
}
