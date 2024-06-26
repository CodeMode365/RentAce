"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  closeLogoutModal,
} from "@/lib/redux/slices/modal";
import { Badge } from "./ui/badge";
import clsx from "clsx";
import { closeDashboard } from "@/lib/redux/slices/dashboard";
import { setLoggedOut } from "@/lib/redux/slices/globalSetting";

const navLinks = [
  { name: "Home", icon: Home, isActive: true, openModal: undefined },
  { name: "Profile", icon: UserCircle2, isActive: true, openModal: undefined },
  {
    name: "Spaces",
    icon: Crown,
    isActive: true,
    openModal: "Spaces",
  },
  {
    name: "Chats",
    icon: MessageSquare,
    isActive: true,

    openModal: undefined,
  },
  {
    name: "Notifications",
    icon: MdNotifications,
    isActive: false,
    openModal: undefined,
  },
  { name: "History", icon: History, isActive: false, openModal: undefined },
  { name: "Settings", icon: Settings, isActive: true, openModal: "Settings" },
];

const Sidebar = ({
  setActiveIndex,
  activeIndex,
}: {
  setActiveIndex: Dispatch<SetStateAction<number>>;
  activeIndex: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(
    (state: RootState) => state.globalSetting.userInfo
  );

  const close = () => {
    dispatch(closeDashboard());
  };

  const logOut = () => {
    localStorage.clear();
    dispatch(closeLogoutModal());
    dispatch(setLoggedOut());
    dispatch(setLoggedOut());
  };
  return (
    <section
      className={` bg-white transition-transform ease-in-out duration-300  h-full dark:bg-slate-900`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="border-b mx-4 pt-3 pb-2 px-1 font-semibold text-lg shadow-sm flex items-center justify-between">
        <h1>
          <span className="text-sky-500">Rent</span>Ace
        </h1>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="bg-transparent hover:bg-transparent"
          onClick={() => {
            close();
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
              py-2 px-2 font text-xs rounded-sm mb-1 flex items-center cursor-pointer shadow-sm `,
              activeIndex === index
                ? "bg-sky-400 text-white"
                : "text-gray-700 dark:text-gray-500",
              !link.isActive && "text-gray-700/60 cursor-wait"
            )}
            onClick={() => {
              link.isActive && setActiveIndex(index);
              // openSpecifiModal(link.openModal);
            }}
          >
            <span className="mr-2">
              <link.icon size={18} />
            </span>
            {link.name}
            {!link.isActive && (
              <span className="ml-auto">
                <Badge className="bg-rose-500 animate-bounce text-[10px] dark:text-white hover:bg-rose-500">
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
            {userInfo?.username}
          </h3>
          <span className=" text-xs leading-tight text-sky-500 animate-pulse delay-1000">
            {userInfo?.userType}
          </span>
        </div>
        <div className="ml-6 h-full my-auto flex items-center text-rose-500">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <LogOut
                size={20}
                className="cursor-pointer"
                // onClick={() => Open_lotout_Modal()}
              />
            </AlertDialogTrigger>
            <AlertDialogContent className="">
              <AlertDialogHeader>
                <AlertDialogTitle>Do you want to logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  Youa&apos;ll be logged out of the current account and is not
                  retrival.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => {}}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => logOut()}>
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
