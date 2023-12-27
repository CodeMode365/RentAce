"use client";

import React, { useState } from "react";

import Sidebar from "../Sidebar";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("./Home"), { ssr: true });
const Settings = dynamic(() => import("./Settings"), { ssr: true });
const Profile = dynamic(() => import("./Profile"), { ssr: true });
const Spaces = dynamic(() => import("./Spaces"), { ssr: true });
const Chats = dynamic(() => import("./Chats"), { ssr: true });

const Operation = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className={`absolute top-0 left-0 w-screen h-screen grid grid-cols-12 z-[25]`}
    >
      <div className="col-span-2 relative border-r ">
        <Sidebar setActiveIndex={setActiveIndex} activeIndex={activeIndex} />
      </div>
      <div className="col-span-10 relative bg-white dark:bg-text  dark:bg-slate-900">
        {activeIndex == 0 ? (
          <Home />
        ) : activeIndex == 1 ? (
          <Profile />
        ) : activeIndex == 2 ? (
          <Spaces />
        ) : activeIndex == 3 ? (
          <Chats />
        ) : (
          <Settings />
        )}
      </div>
    </section>
  );
};

export default Operation;
