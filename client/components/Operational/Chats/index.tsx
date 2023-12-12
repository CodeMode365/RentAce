import React from "react";
import Header from "../reusable/Header";
import UserListItem from "./UserListItem";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChattingArea from "./ChattingArea";

const Chats = () => {
  return (
    <div className="w-full h-full p-4 absolute ">
      <Header title="Chats" />
      <div className="w-full p-2 my-4 h-[80vh] flex border rounded-md shadow-sm">
        <div className="w-3/5 flex flex-col  border-r  h-full overflow-y-auto">
          <h2 className="text-left text-lg font-medium mb-2">Recent Chats</h2>
          <input
            placeholder="Search user"
            className="p-2 border rounded-md mb-1"
          />
          <ScrollArea className="h-full overflow-y-auto w-full">
            <UserListItem />
            <UserListItem />
            <UserListItem />
            <UserListItem />
            <UserListItem />
            <UserListItem />
            <UserListItem />
            <UserListItem />
            <UserListItem />
            <UserListItem />
            <UserListItem />
            <UserListItem />
          </ScrollArea>
        </div>

        <div className="col-span-9 h-full relative">
          <ChattingArea />
        </div>
      </div>
    </div>
  );
};

export default Chats;
