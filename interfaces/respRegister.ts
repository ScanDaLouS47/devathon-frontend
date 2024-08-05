export interface DataRegister {
  id: number;
  email: string;
  role: string;
  name: string;
  lName: string;
  phone: string;
  image_url: string | null;
}

export interface RespRegister {
  ok: boolean;
  data: DataRegister;
  msg: string;
}
