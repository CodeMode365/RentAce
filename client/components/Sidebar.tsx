import React from "react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  ActivitySquare,
  History,
  Home,
  MessageSquare,
  Settings,
  UserCircle2,
} from "lucide-react";

const navLinks = [
  { name: "Home", icon: Home },
  { name: "Profile", icon: UserCircle2 },
  { name: "Chats", icon: MessageSquare },
  { name: "Settings", icon: Settings },
  { name: "History", icon: History },
  { name: "Activity", icon: ActivitySquare },
];
const Sidebar = () => {
  return (
    <div className="absolute left-0 top-0 w-screen h-screen bg-black/80 z-[999] ">
      <section className="w-60 h-full bg-white">
        <div className="border-b mx-4 pt-3 pb-2 px-1 font-semibold text-lg shadow-sm flex items-center justify-between">
          <h1>
            <span className="text-sky-500">Park</span>Out
          </h1>
          <Button
            variant={"secondary"}
            size={"icon"}
            className="bg-transparent hover:bg-transparent"
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
              className={`${
                index == 0 ? "bg-sky-500 text-white" : "text-gray-700"
              }  py-2 px-2 font text-sm rounded-sm mb-1 flex items-center cursor-pointer`}
            >
              <span className="mr-2">
                <link.icon size={20} />
              </span>
              {link.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Sidebar;
