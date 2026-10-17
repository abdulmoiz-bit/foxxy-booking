import { Suspense } from "react";
//import CabinList from "../_components/CabinList";
import Spinner from "../_components/ui/Spinner";
//import Counter from "../_components/ui/Counter";
import Filter from "../_components/ui/Filter";
import ReservationReminder from "../_components/ReservationReminder";
import { getCabins } from "../_services/data-service";
import Image from "next/image";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid";
import type { CabinSummary } from "@/app/_types/domain";

export const revalidate = 3600;
// export const revalidate = 15;

export const metadata = {
  title: "Cabins",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const capacity = searchParams.capacity;
  const filter = Array.isArray(capacity)
    ? capacity[0] ?? "all"
    : capacity ?? "all";
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins: CabinSummary[] = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  else if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  else if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-700 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        {/*
        <CabinList filter={filter} />
        */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {displayedCabins.map((cabin) => (
            <div className="flex border-primary-300 border" key={cabin.id}>
              <div className="flex-1 relative">
                <Image
                  src={cabin.image}
                  fill
                  alt={`Cabin ${cabin.name}`}
                  className="object-cover border-r border-primary-300"
                />
              </div>

              <div className="flex-grow">
                <div className="pt-5 pb-4 px-7 bg-primary-100">
                  <h3 className="text-accent-700 font-semibold text-2xl mb-3">
                    Cabin {cabin.name}
                  </h3>

                  <div className="flex gap-3 items-center mb-2">
                    <UsersIcon className="h-5 w-5 text-primary-600" />
                    <p className="text-lg text-primary-700">
                      For up to{" "}
                      <span className="font-bold">{cabin.maxCapacity}</span>{" "}
                      guests
                    </p>
                  </div>

                  <p className="flex gap-3 justify-end items-baseline">
                    {cabin.discount > 0 ? (
                      <>
                        <span className="text-3xl font-[350]">
                          ${cabin.regularPrice - cabin.discount}
                        </span>
                        <span className="line-through font-semibold text-primary-600">
                          ${cabin.regularPrice}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-[350]">
                        ${cabin.regularPrice}
                      </span>
                    )}
                    <span className="text-primary-700">/ night</span>
                  </p>
                </div>

                <div className="bg-primary-100 border-t border-t-primary-300 text-right">
                  <Link
                    href={`/cabins/${cabin.id}`}
                    className="border-l border-primary-300 rounded-xl py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
                  >
                    Details & reservation &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ReservationReminder />
      </Suspense>
    </>
  );
}
