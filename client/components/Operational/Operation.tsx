"use client";

import React, { useState } from "react";
import Sidebar from "../Sidebar";
// import SpacesModal from "../Modal/SpacesModal";
import Home from "./Home";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  MdNotifications,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import {
  Crown,
  History,
  LucideHome,
  LogOut,
  MessageSquare,
  // Settings,
  UserCircle2,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
// import { closeSidebar } from "@/lib/redux/slices/sidebar";
import {
  closeSettingsModal,
  closeSpacesModal,
  openLogoutModal,
  openSettingsModal,
  openSpacesModal,
} from "@/lib/redux/slices/modal";
// import SpacesModal from "./Modal/SpacesModal";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
// import SettingsModal from "./Modal/SettingsModal";
import dynamic from "next/dynamic";
import Settings from "./Settings";
import Profile from "./Profile";
import Spaces from "./Spaces";

const SettingsModal = dynamic(() => import("@/components/Modal/SettingsModal"));
const SpacesModal = dynamic(() => import("@/components/Modal/SpacesModal"));

const Operation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const Open_lotout_Modal = () => {
    dispatch(openLogoutModal());
  };
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
