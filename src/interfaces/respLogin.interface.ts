import { IUser } from './user.interface';

export interface Data {
  user: IUser;
  token: string;
  refreshToken?: string;
  expires_at?: number;
}

export interface IRespLogin {
  ok: boolean;
  data: Data | null;
  msg: string;
}
