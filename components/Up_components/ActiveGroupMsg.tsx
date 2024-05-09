"use client"
import { useEffect, useRef, useState } from "react"
import { useChatSocket } from "../contexts/ChatSocketContext";
import { Textarea } from "../ui/textarea";


function ActiveGroupMsg({ activeGroup }: { activeGroup: any }) {
    //activeGroup.messages.sender.id === user.id
    //activeGroup.messages.sender.id !== user.id
    const [messages, setMessages] = useState<object[]>([])
    const { chatSocket, } = useChatSocket() as any;
    const u = useRef<HTMLUListElement>(null);
    const [message, setMessage] = useState<string>("");
    const {chatUser} = useChatSocket() as any;
    function handleOnChange(e: any) {
        setMessage(e.target.value);

    }
    function handleSend() {

        chatSocket?.emit('send-message-group', activeGroup.id, message,chatUser.id );
    }
    useEffect(() => {
        if (activeGroup) {
            chatSocket?.emit('switch-group', activeGroup.id)

        }

        chatSocket?.on('load-group-chats', (chat: any) => {
            setMessages(chat);
            if (u.current) {
                u.current.innerHTML = "";
            }
            chat.map((msg: any, index: any) => {
                const new_ele = document.createElement('li')
                const new_ele_lbl = document.createElement('li')
                if (chatUser.id == msg.sender) {
                    new_ele_lbl.textContent = `you `
                    new_ele.textContent = `${msg.message}`
                    const usr_lbl_cls = ['float-right', 'clear-both', 'mx-2', 'text-bold', 'italic', "mb-0", "pb-0"]
                    const usr_cls = ['bg-blue-700', 'rounded-bl-2xl', 'rounded-tr-2xl', "text-white", "p-2", "m-2", "float-right", "clear-both", "mt-0", "drag", "shadow-lg", "lg:w-1/5", "md:w-1/3", "sm:w-1/2", "w-3/4", "h-fit", "break-words"]
                    new_ele_lbl.classList.add(...usr_lbl_cls)
                    new_ele.classList.add(...usr_cls)

                }
                else {
                    new_ele_lbl.textContent = `${msg.name} `
                    new_ele.textContent = `${msg.message}`
                    const usr_lbl_cls = ['float-left', 'clear-both', 'mx-2', 'text-bold', 'italic', "mb-0", "pb-0"]
                    const usr_cls = ['bg-slate-700', 'rounded-tl-2xl', 'rounded-br-2xl', "lg:w-1/5", "md:w-1/3", "sm:w-1/2", "w-3/4", "text-white", "p-2", "m-2", "float-left", "clear-both", "mt-0", "drag", "shadow-lg", "break-words"]
                    new_ele_lbl.classList.add(...usr_lbl_cls)
                    new_ele.classList.add(...usr_cls)

                }
                u.current?.appendChild(new_ele_lbl);
                u.current?.appendChild(new_ele);
            })


            console.log("caht", typeof chat, chat)
        })

        chatSocket?.on('send-message-group', (group_id: any, message: any, userId: any) => {
            console.log("msg received");
            console.log(chatSocket.rooms)
            const new_ele = document.createElement('li');
            const new_ele_lbl = document.createElement('li');
            if (chatUser.id == userId) {
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
            u.current?.appendChild(new_ele_lbl);
            u.current?.appendChild(new_ele);
        }
        )
        return () => {
            chatSocket?.off('load-group-chats');
            chatSocket?.off('send-message-group');

        }

    }, [])


    return (
        <div className="text-black">
            

            <ul ref={u}>

            </ul>
            <div>
                <Textarea
                    className="w-full h-auto border rounded-md px-4 mr-2 text-start word-wrap break-words absolute bottom-0 "
                    placeholder="Type your message..."
                    onChange={handleOnChange}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-sm 
                 absolute bottom-0 right-0"
                    onClick={handleSend}
                >
                    Send
                </button>

            </div>

        </div>
    )
}

export default ActiveGroupMsg
