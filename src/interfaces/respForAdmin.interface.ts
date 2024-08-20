export interface IRespForAdmin {
  ok:   boolean;
  data: Datum[];
  msg:  string;
}

export interface Datum {
  id:        number;
  email:     string;
  role:      Role;
  name:      string;
  lName:     string;
  phone:     string;
  image_url: null | string;
}

export enum Role {
  Admin = "admin",
  User = "user",
}
