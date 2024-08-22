export interface IBookingCreate {
  ok: boolean;
  data: Data;
  msg: string;
}

export interface Data {
  id: number;
  reservationDate: Date;
  tables: number[];
  persons: number;
  additional_info: string;
  allergens: string;
  shift: string;
}
