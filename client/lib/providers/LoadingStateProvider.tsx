"use client";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const LoadingStateProvider = ({ children }: { children: React.ReactNode }) => {
  const isAppLoading = useSelector(
    (state: RootState) => state.globalSetting.isAppLoading
  );
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(isAppLoading);
    }, [isAppLoading]);

  return (
    <>
      <div
        className={`relative w-screen h-screen bg-sky-500 ${
          !isLoading ? "hidden" : "block"
        }`}
        style={{ zIndex: 200 }}
      >
        <div className=" absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 flex flex-col  items-center">
          <ReactLoading type="spokes" className="text-2xl" />
          <h2 className="mt-2 text-white text-xl">Please wait</h2>
        </div>
      </div>
      {children}
    </>
  );
};

export default LoadingStateProvider;
