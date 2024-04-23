"use client"
import { RedoIcon } from "lucide-react";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const ChatSocketContext = createContext(null)

export function useSocket() {
    return useContext(ChatSocketContext)
}
export function ChatSocketProvider({ children }: { children: ReactNode }) {
    
        const socket = io("http://localhost:5000")
        const [groups, setGroups] = useState<any[]>([])
        useEffect(() => {
            // socket.emit('load-groups')  
            socket.on('load-groups', (groups: any) => {
                setGroups(groups)
            })
            return () => {
                socket.off('load-groups')
                socket.disconnect()             
            }
        }, [])
        return (
            <ChatSocketContext.Provider value={{
                socket: socket as any,
                groups: groups,
                setGroups: setGroups
            } as any
            }>
                {children}
            </ChatSocketContext.Provider>
        )
   
}
