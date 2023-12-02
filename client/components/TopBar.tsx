"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { HiDotsVertical } from "react-icons/hi";
import { CgMenuGridO } from "react-icons/cg";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import("@/components/Modal/AuthModal"));

interface CustomWindow extends Window {
  authenticationWindow?: Window | null;
}

const TopBar = () => {
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.globalSetting.isLoggedIn
  );

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

  const authOpener = useRef<HTMLButtonElement | null>(null);

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

      {!isUserLoggedIn && <AuthModal />}
    </nav>
  );
};

export default TopBar;
