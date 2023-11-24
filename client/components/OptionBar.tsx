import React from "react";
import { ArrowUpDown, Locate, MapPin, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import AutoInput from "./AutoInput";

const OptionBar = () => {
  return (
    <section className="absolute top-3 left-3 z-50 bg-white pb-6 min-w-[300px] shadow-lg rounded-md">
      <div className="realative w-full min-h-[20px] flex items-center justify-center my-2">
        <Button
          size={"icon"}
          variant={"secondary"}
          className="absolute left-2 bg-transparent hover:bg-transparent"
        >
          <Menu size={20} />
        </Button>
        <h2 className="font-semibold">Driving Direction</h2>
      </div>

      <div>
        <form className="w-full h-full">
          <div className="grid grid-cols-7">
            <div className="col-span-1 flex flex-col items-center justify-center">
              <span className="m-2">
                <Locate className="text-sky-500" size={20}/>
              </span>
              <span className="m-2">
                <MapPin className="text-rose-500" size={20}/>
              </span>
            </div>

            <div className="col-span-5">
              <AutoInput placeholder="Choose starting point" />
              <AutoInput placeholder="Choose Destination" />
            </div>

            <div className="col-span-1 flex flex-col items-center justify-center">
              <span>
                <ArrowUpDown size={20} className="text-gray-600"/>
              </span>
            </div>
          </div>
        </form>
      </div>

      <div></div>
    </section>
  );
};

export default OptionBar;