export interface User {
  id: number;
  email: string;
  role: string;
  name: string;
  lName: string;
  phone: string;
  image_url: null;
}

export interface DataLogin {
  user: User;
  token: string;
  refreshToken: string;
  expires_at: number;
}

export interface RespLogin {
  ok: boolean;
  data: DataLogin;
  msg: string;
}
