import React from "react";
import Message from "./Message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ChattingArea = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="row-span-1 rounded-md px-2 py-1 flex items-center border-b h-[10%]">
        <div className="mr-2 relative">
          <Avatar className="shadow-md h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Badge className="absolute bottom-0 right-0 p-[5px] bg-green-500 shadow-sm shadow-green-500 drop-shadow-md" />
        </div>
        <div>
          <h2 className="text-lg text-gray-800 flex flex-col">
            <span>Suman Tamang</span>
            <span className="text-rose-500 text-sm">Busy</span>
          </h2>
        </div>
      </div>

      <ScrollArea className="flex-1 overflow-hidden border py-3 px-3">
        <div className="flex justify-between flex-col">
          <Message
            content="Messege from the foreign accoutn"
            senderType="Other"
          />
          <Message
            content="Messege from the foreign accoutn"
            senderType="User"
          />
          <Message
            content="Messege from the foreign accoutn"
            senderType="Other"
          />
          <Message
            content="Messege from the foreign accoutn lore some long long text to be sent for the testing purpose of the chat box and the message handling feature, do you know you can check this  and if something goes wrognt its very much fine for me <h2 className='text-red-500'>Hello world</h2>"
            senderType="User"
          />
          <Message
            content="Messege from the foreign accoutn lore some long long text to be sent for the testing purpose of the chat box and the message handling feature, do you know you can check this  and if something goes wrognt its very much fine for me <h2 className='text-red-500'>Hello world</h2>"
            senderType="User"
          />
          <Message
            content="Messege from the foreign accoutn lore some long long text to be sent for the testing purpose of the chat box and the message handling feature, do you know you can check this  and if something goes wrognt its very much fine for me <h2 className='text-red-500'>Hello world</h2>"
            senderType="User"
          />
          <Message
            content="Messege from the foreign accoutn"
            senderType="User"
          />
          <Message
            content="Messege from the foreign accoutn lore some long long text to be sent for the testing purpose of the chat box and the message handling feature, do you know you can check this  and if something goes wrognt its very much fine for me <h2 className='text-red-500'>Hello world</h2>"
            senderType="User"
          />

          <Message
            content="Messege from the foreign accoutn"
            senderType="User"
          />
          <Message
            content="Messege from the foreign accoutn"
            senderType="User"
          />

          <Message
            content="Messege from the foreign accoutn"
            senderType="User"
          />
          <Message
            content="Messege from the foreign accoutn"
            senderType="User"
          />
        </div>
      </ScrollArea>

      <div className="flex items-center p-2">
        <Input className="w-11/12 mr-1" placeholder="Type your message" />
        <Button
          size={"icon"}
          variant={"secondary"}
          className="flex items-center justify-center text-sky-500"
        >
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default ChattingArea;
