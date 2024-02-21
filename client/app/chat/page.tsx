"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("ws://localhost:3700", {
  transports: ["websocket"],
  path: "/",
});

const ChatTest = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Component mounted");
    // socket.connect();
    socket.on("message", (data) => {
      console.log("Message received:", data);
      setMessages((prev) => [...prev, data]);
    });

    // return () => {
    //   alert("Module unmounted");
    //   socket.off("message");
    //   socket.disconnect();
    // };
  }, []);

  const submitMessage = () => {
    alert("sending message");
    socket.emit("message", text);
    setText("");
  };

  return (
    <div>
      <div className="border h-80 w-96 border-black mx-10 mt-10 mb-2">
        {messages.map((msg, ind) => (
          <h2 key={"message-" + ind}>{msg}</h2>
        ))}
      </div>
      <input
        className="ml-10 mr-4 border border-black"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={() => submitMessage()}>Submit</button>
    </div>
  );
};

export default ChatTest;
