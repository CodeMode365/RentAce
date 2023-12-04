"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  MdNotifications,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import {
  Crown,
  History,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  UserCircle2,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  closeSettingsModal,
  closeSpacesModal,
  openLogoutModal,
  openSettingsModal,
  openSpacesModal,
} from "@/lib/redux/slices/modal";
import { Badge } from "./ui/badge";
import clsx from "clsx";
import dynamic from "next/dynamic";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";

const SettingsModal = dynamic(() => import("./Modal/SettingsModal"));
const SpacesModal = dynamic(() => import("./Modal/SpacesModal"));

const navLinks = [
  { name: "Home", icon: Home, isActive: true, openModal: undefined },
  { name: "Profile", icon: UserCircle2, isActive: true, openModal: undefined },
  {
    name: "Spaces",
    icon: Crown,
    isActive: true,
    openModal: "Spaces",
  },
  { name: "Chats", icon: MessageSquare, isActive: false, openModal: undefined },
  {
    name: "Notifications",
    icon: MdNotifications,
    isActive: false,
    openModal: undefined,
  },
  { name: "History", icon: History, isActive: false, openModal: undefined },
  { name: "Settings", icon: Settings, isActive: true, openModal: "Settings" },
];

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const { isSpacesModalOpen, isSettingsModalOpen } = useSelector(
    (state: RootState) => state.model
  );

  function closeAllModal() {
    dispatch(closeSettingsModal());
    dispatch(closeSpacesModal());
  }

  function openSpecifiModal(type: string | undefined) {
    switch (type) {
      case "Settings":
        closeAllModal();
        dispatch(openSettingsModal());
        break;
      case "Spaces":
        closeAllModal();
        dispatch(openSpacesModal());
        break;
      default:
        closeAllModal();
        break;
    }
  }

  const Open_lotout_Modal = () => {
    dispatch(openLogoutModal());
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="w-64" side={"left"}>
        <SheetHeader className="border-b mx-4 pt-3 pb-2 px-1 font-semibold text-lg shadow-sm flex items-center justify-between">
          <h1>
            <span className="text-sky-500">Rent</span>Ace
          </h1>
        </SheetHeader>
        <>
          {isSettingsModalOpen && <SettingsModal />}

          {isSpacesModalOpen && <SpacesModal />}
          <ul className="my-2 mx-2">
            {navLinks.map((link, index) => (
              <li
                key={"nav-item-" + index}
                aria-disabled={link.isActive}
                className={clsx(
                  `
              py-2 px-2 font text-xs rounded-sm mb-1 flex items-center cursor-pointer shadow-sm`,
                  activeIndex === index
                    ? "bg-sky-400 text-white"
                    : "text-gray-700",
                  !link.isActive && "text-gray-700/60 cursor-wait"
                )}
                onClick={() => {
                  link.isActive && setActiveIndex(index);
                  openSpecifiModal(link.openModal);
                }}
              >
                <span className="mr-2">
                  <link.icon size={18} />
                </span>
                {link.name}
                {!link.isActive && (
                  <span className="ml-auto">
                    <Badge className="bg-rose-500 animate-bounce text-[10px] hover:bg-rose-500">
                      soon
                    </Badge>
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 h-auto flex items-center border-t w-11/12 mx-auto py-2">
            <Avatar className="mr-2 mx-2 shadow-md ">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <h3 className="font-normal leading-tight text-sm">
                Ramesh Poudel
              </h3>
              <span className=" text-xs leading-tight text-sky-500 animate-pulse delay-1000">
                Admin
              </span>
            </div>
            <div className="ml-6 h-full my-auto flex items-center text-rose-500">
              <LogOut
                size={20}
                className="cursor-pointer"
                onClick={() => Open_lotout_Modal()}
              />
            </div>
          </div>
        </>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
