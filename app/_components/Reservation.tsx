import { auth } from "@/app/_services/auth";
import {
  getBookedDatesByCabinId,
  getSettings,
} from "../_services/data-service";
import DateSelector from "./DateSelector";
//import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";
import Link from "next/link";
import type { Cabin } from "@/app/_types/domain";

async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-300 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <div className="grid bg-primary-100 ">
          <p className="text-center text-xl py-12 self-center">
            Please{" "}
            <Link href="/login" className="underline text-accent-500">
              login
            </Link>{" "}
            to reserve this
            <br /> cabin right now
          </p>
        </div>
      )}
    </div>
  );
}

export default Reservation;
