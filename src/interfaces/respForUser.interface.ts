import { IUser } from './user.interface';

export interface IRespForUser {
  ok: boolean;
  data: IUser;
  msg: string;
}
