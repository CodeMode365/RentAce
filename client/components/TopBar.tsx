"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { HiDotsVertical } from "react-icons/hi";
import { CgMenuGridO } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { openAuthModal } from "@/lib/redux/slices/modal";

interface CustomWindow extends Window {
  authenticationWindow?: Window | null;
}

const TopBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  // const openWindow = () => {
  //   const customWindow = window as CustomWindow;
  //   const authenticationPageURL = "http://localhost:3000/auth";
  //   const windowFeatures = "width=600,height=400,top=100,left=100";

  //   if (
  //     customWindow.authenticationWindow &&
  //     !customWindow.authenticationWindow.closed
  //   ) {
  //     customWindow.authenticationWindow.focus();
  //   } else {
  //     customWindow.authenticationWindow = window.open(
  //       authenticationPageURL,
  //       "_blank",
  //       `noopener,noreferrer,${windowFeatures}`
  //     );

  //     if (customWindow.authenticationWindow) {
  //       customWindow.authenticationWindow.focus();
  //     }
  //   }
  // };

  const OpenAuthModla = () => {
    dispatch(openAuthModal());
  };

  return (
    <nav className="absolute top-0 left-0 w-screen h-10 flex justify-end py-4 z-50">
      <Button
        variant={"secondary"}
        size={"icon"}
        className="mx-1 rounded-full shadow-lg"
      >
        <CgMenuGridO size={24} />
      </Button>
      <Button
        variant={"secondary"}
        size={"icon"}
        className="mx-1 rounded-full shadow-lg"
      >
        <HiDotsVertical size={24} />
      </Button>
      <Button
        className="mx-1   flex items-center justify-center p-0 bg-transparent hover:bg-transparent border-none"
        size={"sm"}
        onClick={() => {
          // openWindow();
          OpenAuthModla();
        }}
      >
        <span
          // href={"/auth"}
          className=" h-full w-full flex justify-center items-center px-6 bg-sky-500 hover:bg-sky-600 rounded-2xl"
        >
          Login
        </span>
      </Button>
    </nav>
  );
};

export default TopBar;
