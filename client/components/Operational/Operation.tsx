"use client";

import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Home from "./Home";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import Settings from "./Settings";
import Profile from "./Profile";
import Spaces from "./Spaces";

const Operation = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const isDashboardOpen = useSelector(
    (state: RootState) => state.dashoard.isDashboardOpen
  );

  return isDashboardOpen ? (
    <section
      className={`absolute top-0 left-0 w-screen h-screen grid grid-cols-12 z-[999] `}
    >
      <div className="col-span-2 relative border-r ">
        <Sidebar setActiveIndex={setActiveIndex} activeIndex={activeIndex} />
      </div>
      <div className="col-span-10 relative bg-white">
        {activeIndex == 0 ? (
          <Home />
        ) : activeIndex == 1 ? (
          <Profile />
        ) : activeIndex == 2 ? (
          <Spaces />
        ) : (
          <Settings />
        )}
      </div>
    </section>
  ) : null;
};

export default Operation;
