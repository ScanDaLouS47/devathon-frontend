export interface Booking {
  id: string;
  title: string;
  start: string;
  end: string;
  status: Status;
}

type Status = 'full' | 'available';
