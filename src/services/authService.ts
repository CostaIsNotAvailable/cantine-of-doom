import { Credentials, JwtToken, User } from '../models';
import { IAuthService } from './interfaces';
import { sign, verify } from 'jsonwebtoken';
import { JwtTokenPayload } from '../models/jwtTokenPayload';

export default class AuthService implements IAuthService {
  users: User[] = [
    { id: 1, login: 'alexandre@gmail.com', password: 'alexandre' },
    { id: 2, login: 'vincent@gmail.com', password: 'vincent' }
  ];
  privateKey: string = 'This is a private key';

  public async login(credentials: Credentials): Promise<JwtToken | undefined> {
    const user = this.users.find((u) => u.login === credentials.login && u.password === credentials.password);

    if (!user) {
      return undefined;
    }

    const jwtTokenPayload: JwtTokenPayload = {
      id: user.id,
      login: user.login
    };

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    const jwtToken: JwtToken = {
      token: sign(jwtTokenPayload, this.privateKey),
      expirationDate: expirationDate
    };

    return jwtToken;
  }

  public async isAuthorized(jwtToken: string): Promise<boolean> {
    try {
      verify(jwtToken.replace('Bearer ', ''), this.privateKey);
      return true;
    } catch {
      return false;
    }
  }
}