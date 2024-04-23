"use client"
import { useEffect, useRef, useState } from "react"
import { useChatSocket } from "../contexts/ChatSocketContext";


function ActiveGroupMsg({ activeGroup }: { activeGroup: any }) {
    //activeGroup.messages.sender.id === user.id
    //activeGroup.messages.sender.id !== user.id
    const [messages, setMessages] = useState<object[]>([])
    const { chatSocket, } = useChatSocket() as any;
    const u = useRef<HTMLUListElement>(null);

    useEffect(() => {
            if (activeGroup) {
                chatSocket?.emit('load-group-chats', activeGroup.id)

            }
            
                chatSocket?.on('load-group-chats', (chat: any) => {
                    setMessages(chat);
                    chat.map((msg: any, index: any) => {
                        const new_ele = document.createElement('li')
                        // const new_ele_lbl = document.createElement('li')
                        if ("userid" == msg.sender) {
                            // new_ele_lbl.textContent = `you `
                            new_ele.textContent = `${msg.message}`
                            // const usr_lbl_cls = ['float-right', 'clear-both', 'mx-2', 'text-bold', 'italic', "mb-0", "pb-0"]
                            const usr_cls = ['bg-blue-700', 'rounded-bl-2xl', 'rounded-tr-2xl', "text-white", "p-2", "m-2", "float-right", "clear-both", "mt-0", "drag", "shadow-lg", "lg:w-1/5", "md:w-1/3", "sm:w-1/2", "w-3/4", "h-fit", "break-words"]
                            // new_ele_lbl.classList.add(...usr_lbl_cls)
                            new_ele.classList.add(...usr_cls)

                        }
                        else {
                            // new_ele_lbl.textContent = `${msg.username} `
                            new_ele.textContent = `${msg.message}`
                            // const usr_lbl_cls = ['float-left', 'clear-both', 'mx-2', 'text-bold', 'italic', "mb-0", "pb-0"]
                            const usr_cls = ['bg-slate-700', 'rounded-tl-2xl', 'rounded-br-2xl', "lg:w-1/5", "md:w-1/3", "sm:w-1/2", "w-3/4", "text-white", "p-2", "m-2", "float-left", "clear-both", "mt-0", "drag", "shadow-lg", "break-words"]
                            // new_ele_lbl.classList.add(...usr_lbl_cls)
                            new_ele.classList.add(...usr_cls)

                        }

                        u.current?.appendChild(new_ele);
                    })


                    console.log("caht", typeof chat, chat)
                })

                chatSocket?.on('send-message-group', (group_id:any,message:any,userId:any ) => {
                    console.log("msg received");
                    const new_ele = document.createElement('li');
                    const new_ele_lbl = document.createElement('li');
                    if ("userid" == userId) {
                        new_ele_lbl.textContent = `you `
                        new_ele.textContent = `${message}`
                        const usr_lbl_cls = ['float-right', 'clear-both', 'mx-2', 'text-bold', 'italic', "mb-0", "pb-0"]
                        const usr_cls = ['bg-blue-700', 'rounded-bl-2xl', 'rounded-tr-2xl', "text-white", "p-2", "m-2", "float-right", "clear-both", "mt-0", "drag", "shadow-lg", "lg:w-1/5", "md:w-1/3", "sm:w-1/2", "w-3/4", "h-fit", "break-words"]
                        new_ele_lbl.classList.add(...usr_lbl_cls)
                        new_ele.classList.add(...usr_cls)

                    }
                    else {
                        new_ele_lbl.textContent = `${userId} `
                        new_ele.textContent = `${message}`
                        const usr_lbl_cls = ['float-left', 'clear-both', 'mx-2', 'text-bold', 'italic', "mb-0", "pb-0"]
                        const usr_cls = ['bg-slate-700', 'rounded-tl-2xl', 'rounded-br-2xl', "lg:w-1/5", "md:w-1/3", "sm:w-1/2", "w-3/4", "text-white", "p-2", "m-2", "float-left", "clear-both", "mt-0", "drag", "shadow-lg", "break-words"]
                        new_ele_lbl.classList.add(...usr_lbl_cls)
                        new_ele.classList.add(...usr_cls)

                    }

                    u.current?.appendChild(new_ele);
                }
                )
                return () => {
                    chatSocket?.off('load-group-chats');
                    chatSocket?.off('send-message-group');

                }
            // Add closing parenthesis here
        }, []) // Move closing parenthesis here


    return (
        <div className="text-black">
            messages
            
            <ul ref={u}>

            </ul>

        </div>
    )
}

export default ActiveGroupMsg
