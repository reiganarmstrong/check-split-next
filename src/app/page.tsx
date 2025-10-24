import Image from "next/image";
import Receipt from "../lib/assets/receipt.svg";
import Intro from "./_components/intro";

export default function Home() {
  return (
    <div className="flex flex-row h-full">
      <Intro />
      <div className="w-1/2 justify-center items-start hidden md:flex">
        <Image
          src={Receipt}
          alt="receipt"
          className="shadow-lg/30 rounded-xl"
        />
      </div>
    </div>
  );
}
