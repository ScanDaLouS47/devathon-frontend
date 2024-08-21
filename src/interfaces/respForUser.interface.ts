import { IUser } from './user.interface';

// Valid for Create, Update and Delete User
export interface IRespForUser {
  ok: boolean;
  data: IUser;
  msg: string;
}
