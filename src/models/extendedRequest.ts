import { Request } from 'express';
import { JwtTokenPayload } from '.';

export interface ExtendedRequest extends Request {
  user?: JwtTokenPayload;
}
