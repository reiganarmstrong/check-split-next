import Image from "next/image";
import Receipt from "@/../public/receipt.svg";
import Intro from "./_components/intro";

export default function Home() {
  return (
    <div className="flex flex-row h-full">
      <Intro />
      <div className="justify-center w-1/2 items-center hidden md:flex">
        {/* <div className=""> */}
        <Image
          src={Receipt}
          alt="receipt"
          className="shadow-lg/30 rounded-xl"
        />
      </div>
    </div>
  );
}
