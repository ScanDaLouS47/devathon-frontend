export interface IUser {
  id: number;
  email: string;
  role: Role;
  name: string;
  lName: string;
  phone: string;
  image_url?: string;
}

export enum Role {
  Admin = 'admin',
  User = 'user',
}
