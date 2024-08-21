export interface IRespBooking {
  ok: boolean;
  data: BookingData[];
  msg: string;
}

export interface BookingData {
  id: number;
  reservationDate: Date;
  tables: number[];
  persons: number;
  additional_info: null;
  allergens: string;
  shift: string;
}
