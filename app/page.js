import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png";

export default function Page() {
  return (
    <main className="absolute inset-x-0 bottom-0 top-[73px] flex items-center justify-center">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 px-6 text-center">
        <h1 className="mb-10 text-5xl font-normal tracking-tight text-primary-50 md:text-8xl">
          Welcome to Foxxy Hotel
        </h1>
        <Link
          href="/cabins"
          className="rounded-xl bg-accent-500 px-8 py-6 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
