"use client";

import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
} from "react";
import {
  ArrowUpDown,
  Bike,
  CarFront,
  Footprints,
  Locate,
  MapPin,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AutoInput from "./AutoInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { openDashboard } from "@/lib/redux/slices/dashboard";
import dynamic from "next/dynamic";

const Operation = dynamic(() => import("./Operational/Operation"), {
  ssr: true,
});
const ReusableTooltip = dynamic(() => import("./reusables/ReusableTooltip"), {
  ssr: true,
});

interface iProps {
  currentDirOption: "Driving" | "Cycling" | "Walking";
  setCurrentDirOption: Dispatch<
    SetStateAction<"Driving" | "Cycling" | "Walking">
  >;
}

const OptionBar: FC<iProps> = ({ currentDirOption, setCurrentDirOption }) => {
  const dispatch = useDispatch();

  // const dispatch = useDispatch();

  const { isDashboardOpen } = useSelector((state: RootState) => state.dashoard);
  const { isLoggedIn } = useSelector((state: RootState) => state.globalSetting);

  const open = () => {
    dispatch(openDashboard());
  };

  const directionOptions = [
    { title: "Driving", icon: CarFront },
    { title: "Cycling", icon: Bike },
    { title: "Walking", icon: Footprints },
  ];

  useEffect(() => {
    console.log(isDashboardOpen, isLoggedIn);
  }, [isDashboardOpen, isLoggedIn]);

  return (
    <>
      <section className="absolute top-3 left-3 z-20 bg-white pb-6 shadow-lg rounded-md w-[320px] dark:bg-slate-700">
        <div className="realative w-full min-h-[20px] flex items-center justify-center my-2">
          {isLoggedIn && (
            <Button
              size={"icon"}
              variant={"secondary"}
              className="absolute left-2 bg-transparent hover:bg-transparent dark:text-white"
              onClick={open}
            >
              <Menu size={20} />
            </Button>
          )}
          <h2 className="font-medium text-lg">{currentDirOption} Direction</h2>
        </div>

        <div>
          <form className="w-full h-full">
            <div className="grid grid-cols-7">
              <div className="col-span-1 flex flex-col items-center justify-center">
                <span className="m-2">
                  <Locate className="text-sky-500" size={20} />
                </span>
                <span className="m-2">
                  <MapPin className="text-rose-500" size={20} />
                </span>
              </div>

              <div className="col-span-5">
                <AutoInput placeholder="Choose starting point" />
                <AutoInput placeholder="Choose Destination" />
              </div>

              <div className="col-span-1 flex flex-col items-center justify-center">
                <span>
                  <ReusableTooltip content={<p>Swap</p>}>
                    <ArrowUpDown size={20} className="text-gray-600 dark:text-white" />
                  </ReusableTooltip>
                </span>
              </div>
            </div>
          </form>

          <div className="w-full flex justify-between items-center px-20 mt-4">
            {directionOptions.map((dir, index) => {
              return (
                <span
                  key={"directional-" + index}
                  className={` h-8 w-8 flex items-center justify-center border rounded-full ${
                    currentDirOption == dir.title
                      ? "text-sky-500"
                      : "text-gray-500"
                  }`}
                  onClick={() =>
                    setCurrentDirOption(
                      dir.title as "Driving" | "Cycling" | "Walking"
                    )
                  }
                >
                  <ReusableTooltip content={<p>Find {dir.title} direction</p>}>
                    <dir.icon />
                  </ReusableTooltip>
                </span>
              );
            })}
          </div>
        </div>
      </section>
      {isLoggedIn && isDashboardOpen && <Operation />}
    </>
  );
};

export default OptionBar;
