export type Cabin = {
  id: number;
  name: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
};

export type Guest = {
  id: number;
  email: string;
  fullName: string;
  nationality: string | null;
  nationalID: string | null;
  countryFlag: string | null;
};

export type CabinSummary = Omit<Cabin, "description">;

export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  observations?: string | null;
  status?: string;
};

export type ReservationBooking = Booking & {
  cabins: Pick<Cabin, "name" | "image">[];
};

export type Settings = {
  minBookingLength: number;
  maxBookingLength: number;
};

export type Country = {
  name: string;
  flag: string;
};

export type NewBooking = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
};
