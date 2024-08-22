export interface IRespBooking {
  ok:   boolean;
  data: Data;
  msg:  string;
}

export interface Data {
  id:              number;
  reservationDate: Date;
  tables:          number[];
  persons:         number;
  additional_info: null;
  allergens:       string;
  shift:           string;
}
