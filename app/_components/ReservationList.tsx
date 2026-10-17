"use client";

import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_services/actions";

import { useOptimistic } from "react";
import type { ReservationBooking } from "@/app/_types/domain";

function ReservationList({ bookings }: { bookings: ReservationBooking[] }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId: number) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
