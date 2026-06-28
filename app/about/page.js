import Image from "next/image";
import image1 from "@/public/about-1.jpg";
//import image2 from "@/public/about-2.jpg";
import { getCabins } from "@/app/_services/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
     
    </div>
  );
}
