import React, { FC, useEffect, useState } from "react";
import Message from "./Message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getMessages, sendMessage } from "@/actions/MsgActions";
import useAuthKey from "@/hooks/useAuthKey";
import toast from "react-hot-toast";
import { IMessage } from "@/types/message";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";

interface iProps {
  activeChatId: string;
}

const ChattingArea: FC<iProps> = ({ activeChatId }) => {
  const token = useAuthKey();
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const { userInfo } = useSelector((state: RootState) => state.globalSetting);

  const getUsersMessage = async () => {
    await getMessages(token, activeChatId, page)
      .then((res) => {
        setMessages(res);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  useEffect(() => {
    getUsersMessage();
  }, [activeChatId]);

  const sendCurrentMessage = async () => {
    await sendMessage(token, inputMessage, activeChatId)
      .then((res) => {
        toast.success(res.message);
        setInputMessage("");
      })
      .catch((error) => toast.error(error.message));
  };

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
            <span>{}</span>
            <span className="text-rose-500 text-sm">Busy</span>
          </h2>
        </div>
      </div>

      <ScrollArea className="flex-1 overflow-hidden border py-3 px-3">
        <div className="flex justify-between flex-col">
          {messages.map((msg) => (
            <Message
              content={msg.content}
              senderType={userInfo?.id == msg.senderId ? "User" : "Other"}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="flex items-center p-2">
        <Input
          className="w-11/12 mr-1"
          placeholder="Type your message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button
          size={"icon"}
          variant={"secondary"}
          className="flex items-center justify-center text-sky-500"
          onClick={() => {
            sendCurrentMessage();
          }}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default ChattingArea;
