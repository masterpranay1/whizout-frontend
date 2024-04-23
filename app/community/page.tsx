"use client"
import React, { useEffect, useState } from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Textarea } from '@/components/ui/textarea'
import GroupList from '@/components/Up_components/GroupList'
import { useChatSocket } from '@/components/contexts/ChatSocketContext'
import ActiveGroupMsg from '@/components/Up_components/ActiveGroupMsg'
import { Socket } from 'socket.io-client'


function CommunityPage() {
    const [userListSize, setUserListSize] = useState();
    const { chatSocket, groups } = useChatSocket() as any;
    const [activeGroup, setActiveGroup] = useState<any>();
    const [message, setMessage] = useState<string>("");

    function loadGroups() {
        if (chatSocket) {
            console.log("load-groups called" )
            chatSocket?.emit('load-groups');

        }
        
    }
    
    console.log(groups)
    function handleResize(size: number) {
        setUserListSize(size as any)
    }

    function fetchGroupMsg(group: any){
        if (activeGroup) {
            setActiveGroup(JSON.stringify(group))
            // chatSocket?.emit('load-group-chats', JSON.parse(activeGroup).id);
        }
    }
    
    function handleOnChange(e: any) {
        setMessage(e.target.value);
        
    }
    function handleSend(){
        chatSocket?.emit('send-message-group', activeGroup.id,message, "userid");
    }
    useEffect(() => {
        if (activeGroup) {
            chatSocket?.emit('switch-group', JSON.parse(activeGroup).id);
        }
    }, [activeGroup])
    return (

        <ResizablePanelGroup direction="horizontal" className='h-full border-black border'>
            <ResizablePanel defaultSize={25} className='border border-slate-500' onResize={handleResize}>
                <div onClick={loadGroups}>
                    Groups
                </div>

                {(groups)&&(groups as any[]).map((group: any, index: any) => {
                    console.log(group)
                    return (
                        <div key={index} onClick={()=>setActiveGroup(JSON.stringify(group))}>
                            <GroupList size={userListSize as any} group={JSON.stringify(group)} />
                        </div>
                    )
                })}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75} className="h-screen flex flex-col border border-slate-500">
                <ResizablePanelGroup direction='vertical' >
                    <div >
                        {activeGroup&&JSON.parse(activeGroup)?.name}
                    </div>
                    <ResizablePanel defaultSize={65} className="bg-gray-200 flex-1 overflow-y-scroll">
                        {activeGroup&&<ActiveGroupMsg activeGroup={(groups.filter((group: any) => group.id === JSON.parse(activeGroup).id)[0])} />}
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={15} className='flex bg-gray-100 px-4 py-2 border border-slate-500 text-start word-wrap break-words' >

                        <Textarea
                            className="w-full h-full border rounded-md px-4 mr-2 text-start word-wrap break-words"

                            placeholder="Type your message..."
                            onChange={handleOnChange}
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-sm h-10"
                        onClick={handleSend}
                        >
                            Send
                        </button>

                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>


        </ResizablePanelGroup>


    )
}

export default CommunityPage


