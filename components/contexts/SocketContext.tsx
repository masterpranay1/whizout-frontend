"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface IChat {
  isSender?: boolean;
  message: string;
}

interface IMessages {
  [key: string]: IChat[];
}

interface ISocketContext {
  sendMessage: (msg: string, to: string) => any;
  messages: {
    [key: string]: IChat[];
  };
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  isFree: "not-set" | "free" | "busy";
  receiverId: string | undefined;
  onSkip: () => void;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string>("");
  const [receiverId, setReceiverId] =
    useState<ISocketContext["receiverId"]>(undefined);

  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<IMessages>({});
  const [free, setFreeState] = useState<ISocketContext["isFree"]>("not-set");

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg, to) => {
      console.log("Send Message", msg);
      if (socket) {
        socket.emit("send-message", { message: msg, to });
        setMessages((prev) => ({
          ...prev,
          [to]: [...(prev[to] || []), { message: msg, isSender: true }],
        }));
      }
    },
    [socket]
  );

  const onMessageRec = useCallback(
    (msg: { message: string; from: string }) => {
      console.log("From Server Msg Rec", msg);
      const { message, from } = msg as { message: string; from: string };
      setMessages((prev) => ({
        ...prev,
        [from]: [...(prev[from] || []), { message, isSender: false }],
      }));
    },
    [socket]
  );

  const onOppositeUserRecieved = useCallback(
    (arg: { userId: string }) => {
      setFreeState("busy");
      setReceiverId(arg.userId);
    },
    [socket]
  );

  const onSkip = useCallback(() => {
    setFreeState("free");
    setReceiverId(undefined);
    if (socket)
      socket.emit("set-free", {
        oppositeId: receiverId,
      });
  }, [socket, receiverId]);

  const onSkipped = useCallback(() => {
    console.log("Opposite User Skipped");
    setFreeState("free");
    setReceiverId(undefined);
  }, [socket]);

  useEffect(() => {
    if (!userId) return;

    const _socket = io("http://localhost:8000", {
      query: {
        userId: userId,
      },
    });
    _socket.on("message", onMessageRec);

    _socket.on("opposite-user", onOppositeUserRecieved);

    _socket.on("skipped", onSkipped);

    setSocket(_socket);

    return () => {
      _socket.off("message", onMessageRec);
      _socket.disconnect();
      setSocket(undefined);
      setReceiverId(undefined);
      setUserId("");
    };
  }, [userId]);

  return (
    <SocketContext.Provider
      value={{
        sendMessage,
        messages,
        userId,
        setUserId,
        isFree: free,
        receiverId,
        onSkip,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
