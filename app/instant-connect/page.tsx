"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSocket } from "@/components/contexts/SocketContext";
import { ArrowLeft, Loader2, StepBack } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@/components/contexts/UserContext";

interface IChat {
  isSender?: boolean;
  message: string;
}

const ChatHeader = ({ username }: { username: string }) => {
  return (
    <div className="p-4 border-b flex flex-row gap-2 justify-left items-center">
      <h1 className="text-xl">{username}</h1>
      {/* <div className="">
        <span
          className={`text-xs ${isOnline ? "text-green-500" : "text-red-500"}`}
        >
          {isOnline ? "( Online )" : "( Offline )"}
        </span>
      </div> */}
    </div>
  );
};

const ChatItem = ({ isSender, message }: IChat) => {
  return (
    <div
      className={`flex flex-row gap-2 my-1 ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`bg-white p-2 rounded-md`}>{message}</div>
    </div>
  );
};

const ChatArea = ({ chats }: { chats: IChat[] }) => {
  return (
    <section className="h-[calc(100vh-14.5rem)] bg-orange-50">
      <ScrollArea className="h-full">
        <div className="p-4">
          {chats?.map((chat, index) => (
            <ChatItem
              isSender={chat.isSender}
              message={chat.message}
              key={index}
            />
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

const ChatInput = ({
  sendMessage,
  receiverId,
}: {
  sendMessage: (message: string, to: string) => void;
  receiverId: string;
}) => {
  const [message, setMessage] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="p-4 flex flex-row gap-2 justify-center items-baseline border-t"
    >
      <input
        type="text"
        className="w-full border border-slate-300 rounded-md p-2 focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        className="bg-orange-500 hover:bg-orange-400"
        disabled={!message}
        onClick={(e) => {
          e.preventDefault();
          sendMessage(message, receiverId);
          setMessage("");
        }}
      >
        Send
      </Button>
    </form>
  );
};

const UsersList = ({
  users,
  selectUser,
}: {
  users: string[];
  selectUser: (userId: string) => void;
}) => {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-xl border-b p-4 font-bold text-orange-500">Users</h1>
      <ScrollArea className="h-full">
        <ul className="flex flex-col gap-4 p-4 h-full bg-orange-50 min-h-[90vh]">
          {users?.map((user, index) => (
            <li
              className="border p-2 rounded-md cursor-pointer bg-white hover:bg-orange-200"
              onClick={() => selectUser(user)}
              key={index}
            >
              {user}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

const InstantConnect = () => {
  const {
    sendMessage,
    messages,
    userId,
    isFree,
    receiverId,
    onSkip,
    setUserId,
  } = useSocket();
  const [user] = useUser();

  useEffect(() => {
    console.log("Receiver Id", receiverId);
  }, [receiverId]);

  useEffect(() => {
    console.log("Instant Connect Page and userId = ", userId);
    if (!userId) {
      console.log(user?.username);
      setUserId(user?.username || "");
    }
    return () => {
      console.log("Instant Connect Page Unmounted");
    };
  }, []);

  return (
    <>
      {receiverId && (
        <main className="bg-slate-50 h-screen">
          <section className="p-4 flex flex-row gap-4 h-[calc(100vh-4rem)]">
            {/* <div className="w-2/3 h-full p-4 flex items-center justify-center bg-white border rounded-md">
              <h2 className="text-3xl font-extrabold text-orange-500">
                Video Call
              </h2>
            </div> */}

            <div className="w-full h-full bg-white border rounded-md flex flex-col relative">
              <ChatHeader username={receiverId} />
              <ChatArea chats={messages[receiverId]} />
              <ChatInput sendMessage={sendMessage} receiverId={receiverId} />
            </div>
          </section>
          <section className="w-full h-16 bg-white p-4 flex flex-row items-center">
            <div>
              You are connected as <span className="font-bold">{userId}</span>
            </div>
            <Button
              className="bg-orange-500 hover:bg-orange-400 ml-auto"
              onClick={onSkip}
              size={"lg"}
            >
              Skip
            </Button>
          </section>
        </main>
      )}

      {!receiverId && (
        <main className="bg-slate-50 h-screen flex items-center justify-center">
          <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
        </main>
      )}
    </>
  );
};

export default InstantConnect;
