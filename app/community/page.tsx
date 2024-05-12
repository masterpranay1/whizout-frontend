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
import { useUser } from '@/components/contexts/UserContext'
import { getChatUser } from './_action/actions'



function CommunityPage() {
    const [userListSize, setUserListSize] = useState();
    const { chatSocket, groups, chatUser, setChatUser } = useChatSocket() as any;
    const [activeGroup, setActiveGroup] = useState<any>();
    const [message, setMessage] = useState<string>("");
    const [user, setUser] =  useUser();
    
    
    

    function loadGroups() {
        if (chatSocket) {
            console.log("load-groups called for user id",chatUser?.id )
            chatSocket?.emit('load-groups',chatUser?.id);

        }
        
    }
    
    console.log(groups)
    function handleResize(size: number) {
        setUserListSize(size as any)
    }

    useEffect(() => {
        if (activeGroup) {
            chatSocket?.emit('switch-group', JSON.parse(activeGroup).id);
        }
        console.log("user", user)
        if(user&&chatUser===undefined){
            getChatUser(user).then((data)=>{
                console.log("chat user",data)
                setChatUser(data?.items[0])
            } ).catch((err)=>{
                console.log(err)
            })
        }
    }, [activeGroup,chatUser])
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
                    <ResizablePanel defaultSize={90} className="bg-gray-200 flex-1 overflow-y-scroll">
                        {activeGroup?<ActiveGroupMsg activeGroup={(groups.filter((group: any) => group.id === JSON.parse(activeGroup).id)[0])} />:<div className='text-gray-800 italic h-full  w-full justify-center items-center flex'>
                            Please click on a group to chat or see messages.
                            </div>}
                    </ResizablePanel>
                    
                   
                </ResizablePanelGroup>
            </ResizablePanel>


        </ResizablePanelGroup>


    )
}

export default CommunityPage


