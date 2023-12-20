import React, { FC } from "react";

interface iProps {
  senderType: "User" | "Other";
  content: string;
}

const Message: FC<iProps> = ({ senderType, content }) => {
  const isSender = (): boolean => {
    return senderType == "User";
  };
  return (
    <div
      className={`w-full flex ${
        isSender() ? "justify-end" : "justify-start"
      } my-1`}
    >
      <div
        className={`max-w-[60%] h-auto rounded-lg p-2 
          ${
            isSender()
              ? "bg-sky-200 rounded-br-none"
              : "bg-gray-200 rounded-bl-none"
          }`}
      >
        <p className={`text-left ${isSender() ? "text-left" : "text-right"}`}>
          {content}
        </p>
      </div>
    </div>
  );
};

export default Message;
