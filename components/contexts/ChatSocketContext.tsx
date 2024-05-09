"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { io, Socket } from "socket.io-client";

interface ChatSocketProviderProps {
  children?: React.ReactNode;
}

interface ChatSocketContext {
    groups:any[]
}
const ChatSocketContext = React.createContext<ChatSocketContext|any>(null);

export const useChatSocket = () => {
  const state = useContext(ChatSocketContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

export const ChatSocketProvider: React.FC<ChatSocketProviderProps> = ({ children }) => {
  
  const [chatSocket, setChatSocket] = useState<Socket>();
  const [groups, setGroups] = useState<ChatSocketContext['groups']>([]);
  const [activeGroup, setActiveGroup] = useState<any>("");
  const [chatUser,setChatUser] = useState<any>();
  
  useEffect(() => {
    
    const socket = io("http://localhost:5000");
    socket.on("connect", () => {
        console.log("Connected to Chat Server");
        setChatSocket(socket);
    });
    
    socket.on("load-groups", (groups: any) => {
        console.log("Groups", groups);

        setGroups(groups.items);
    });

    return () => {
      socket.disconnect();
      setChatSocket(undefined);
    };
  }, []);

  return (
    <ChatSocketContext.Provider
      value={{
        chatSocket,
        groups,
        chatUser,
        setChatUser,
      }}
    >
      {children}
    </ChatSocketContext.Provider>
  );
};
