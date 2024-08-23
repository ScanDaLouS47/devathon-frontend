export interface User {
  id: number;
  email: string;
  role: string;
  name: string;
  lName: string;
  phone: string;
  image_url?: string | null;
}

export interface Data {
  user: User;
  token: string;
  refreshToken?: string;
  expires_at?: number;
}

export interface RespFetch {
  ok: boolean;
  data: Data | null;
  msg: string;
}

export interface ILoginPost {
  email: string;
  password: string;
}
