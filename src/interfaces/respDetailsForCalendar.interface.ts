export interface IRespDetailsForCalendar {
  ok: boolean;
  data: BookingDetails[];
  msg: string;
}

export interface BookingDetails {
  id: Date;
  turno: Turno;
  start: Date;
  end: Date;
  status: Status;
}

export enum Status {
  Available = 'available',
  Expired = 'expired',
}

export enum Turno {
  Turno1 = 'Turno 1',
  Turno2 = 'Turno 2',
  Turno3 = 'Turno 3',
  Turno4 = 'Turno 4',
}
