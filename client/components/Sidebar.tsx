"use client";

import React, { useReducer, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  MdNotifications,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import {
  ActivitySquare,
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
import { closeSidebar } from "@/lib/redux/slices/sidebar";
import {
  closeSettingsModal,
  closeSpacesModal,
  openLogoutModal,
  openSettingsModal,
  openSpacesModal,
} from "@/lib/redux/slices/modal";
import SpacesModal from "./Modal/SpacesModal";
import { Badge } from "./ui/badge";
import clsx from "clsx";
import SettingsModal from "./Modal/SettingsModal";
import { stat } from "fs";

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

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);

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

  const closeSideNav = () => {
    dispatch(closeSidebar());
  };

  const Open_lotout_Modal = () => {
    dispatch(openLogoutModal());
  };

  return (
    <div
      className={`absolute left-0 top-0 w-screen h-screen bg-black/80 z-[98] ${
        isSidebarOpen ? "block" : "hidden"
      }`}
      onClick={closeSideNav}
    >
      <SpacesModal />
      <SettingsModal />

      <section
        className={`relative w-60 h-full bg-white transition-transform ease-in-out duration-300 ${
          isSidebarOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="border-b mx-4 pt-3 pb-2 px-1 font-semibold text-lg shadow-sm flex items-center justify-between">
          <h1>
            <span className="text-sky-500">Park</span>Out
          </h1>
          <Button
            variant={"secondary"}
            size={"icon"}
            className="bg-transparent hover:bg-transparent"
            onClick={() => {
              closeSideNav();
            }}
          >
            <MdOutlineKeyboardDoubleArrowLeft
              size={24}
              className="text-gray-500"
            />
          </Button>
        </div>

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
            <h3 className="font-normal leading-tight text-sm">Ramesh Poudel</h3>
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
      </section>
    </div>
  );
};

export default Sidebar;
