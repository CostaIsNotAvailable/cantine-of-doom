import { Credentials, JwtToken, JwtTokenPayload } from '../../models';

export interface IAuthService {
  login(credentials: Credentials): Promise<JwtToken | undefined>;
  isAuthorized(jwtToken: string): Promise<boolean>;
  getTokenPayload(jwtToken: string): Promise<JwtTokenPayload>;
}
