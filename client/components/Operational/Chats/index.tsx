import React, { useEffect, useState } from "react";
import Header from "../reusable/Header";
import UserListItem from "./UserListItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChattingArea from "./ChattingArea";
import { getExisitngConv } from "@/actions/ConvActions";
import useAuthKey from "@/hooks/useAuthKey";
import toast from "react-hot-toast";
import { IConversation } from "@/types/conversation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setActiveChat } from "@/lib/redux/slices/globalSetting";

const Chats = () => {
  const token = useAuthKey();
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const activeChat = useSelector(
    (state: RootState) => state.globalSetting.activeChat
  );
  const activeChatId = useSelector(
    (state: RootState) => state.globalSetting.activeChat
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getExisitngConv(token)
      .then((res) => {
        setConversations(res);
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  }, []);

  const changeActiveChat = (conversation: IConversation) => {
    dispatch(setActiveChat({ activeChat: conversation }));
  };

  return (
    <div className="w-full h-full p-4 absolute ">
      <Header title="Chats" />
      <div className="w-full p-2 my-4 h-[80vh] flex border rounded-md shadow-sm">
        <div className="w-2/5 flex flex-col  border-r  h-full overflow-y-auto">
          <h2 className="text-left text-lg font-medium mb-2">Recent Chats</h2>
          <input
            placeholder="Search user"
            className="p-2 border rounded-md mb-1"
          />
          <ScrollArea className="h-full overflow-y-auto w-full">
            {conversations.map((conv) => (
              <button key={conv.id} onClick={() => changeActiveChat(conv)}>
                <UserListItem
                  userName={conv?.participates[0]?.username}
                  isActive={activeChat?.id == conv.id || false}
                  lastMessage={conv?.messages[0]?.content}
                />
              </button>
            ))}
          </ScrollArea>
        </div>

        <div className="col-span-9 h-full w-full">
          {activeChat && <ChattingArea activeChat={activeChat} />}
        </div>
      </div>
    </div>
  );
};

export default Chats;
