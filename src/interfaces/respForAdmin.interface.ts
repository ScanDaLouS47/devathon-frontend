import { IUser } from './user.interface';

export interface IRespForAdmin {
  ok: boolean;
  data: IUser[];
  msg: string;
}
