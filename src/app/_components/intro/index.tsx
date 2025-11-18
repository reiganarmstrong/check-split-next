import Link from "next/link";
import { Button } from "@/components/ui/button";
export default () => {
  return (
    <div className="flex justify-center w-full md:w-1/2 items-center">
      <div className="flex flex-col h-full max-h-[610px] justify-between w-full ">
        <div className="flex flex-col h-full w-full gap-8 text-center md:text-left">
          <h1 className="text-4xl sm:text-8xl md:text-7xl lg:text-8xl font-bold text-shadow-lg/20">
            Easily Scan & Split Receipts
          </h1>
          <h2 className="text-2xl sm:text-6xl md:text-5xl lg:text-6xl font-semibold text-brand text-shadow-md/30">
            Skip the Napkin Math
          </h2>
        </div>
        <div className="flex flex-col w-full items-center h-full justify-end">
          <Link href={"/home"}>
            <Button
              className="text-2xl p-8 shadow-lg shadow-brand cursor-pointer max-w-sm"
              type="button"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
