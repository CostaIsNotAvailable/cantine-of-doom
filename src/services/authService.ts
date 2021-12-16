import { Credentials, JwtToken, User } from '../models';
import { IAuthService } from './interfaces';
import { sign, verify, decode } from 'jsonwebtoken';
import { JwtTokenPayload } from '../models/jwtTokenPayload';
import { Request } from 'express';
import { MongoHandler } from '.';

export default class AuthService implements IAuthService {
  privateKey: string = 'This is a private key';
  private mongoHandler = new MongoHandler();

  constructor() {
    this.mongoHandler.init();
  }

  public async login(credentials: Credentials): Promise<JwtToken | undefined> {
    const users = await this.mongoHandler.getUsers();
    const user = users.find((u) => u.login === credentials.login && u.password === credentials.password);

    if (!user || !user._id) {
      return undefined;
    }

    const jwtTokenPayload: JwtTokenPayload = {
      id: parseInt(user._id.toHexString(), 16),
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

  public async getTokenPayload(jwtToken: string): Promise<JwtTokenPayload> {
    const payload = decode(jwtToken.replace('Bearer ', '')) as JwtTokenPayload;
    return { id: payload.id, login: payload.login };
  }

  public async getUserIdFromRequest(request: Request): Promise<number | undefined> {
    if (!request.headers.authorization) {
      return undefined;
    }
    return (await this.getTokenPayload(request.headers.authorization)).id;
  }
}
