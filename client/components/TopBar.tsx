"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <nav className="absolute top-0 right-4 w-screen flex justify-end py-4 z-20">
      <Button
        variant={"secondary"}
        size={"icon"}
        className="mx-1 rounded-full shadow-lg h-10 w-10 "
      >
        <CgMenuGridO size={24} />
      </Button>

      <Button
        variant={"secondary"}
        size={"icon"}
        className="mx-1 rounded-full shadow-lg h-10 w-10 "
      >
        <HiDotsVertical size={24} />
      </Button>

      {!isUserLoggedIn && isLoaded && <AuthModal />}
    </nav>
  );
};

export default TopBar;
