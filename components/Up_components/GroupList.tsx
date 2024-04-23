"use client"
import React from 'react'
// import { useSocket } from '../contexts/ChatSocketContext'
import Image from 'next/image'

function GroupList({size,group}:{size:number,group:any}) {

    const data = JSON.parse(group)
    return (
        <div>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden max-w-full mx-auto ">
                
                <ul className="divide-y divide-gray-200">
                    <li className="flex items-center py-4 px-2">
                        
                        <Image
                            className="w-12 h-12 rounded-full object-cover mr-4"
                            src="https://randomuser.me/api/portraits/women/72.jpg"
                            alt="User avatar"
                            width={12}
                            height={12}
                        />
                        {size>10&&<div className="flex-1 sm:visible invisible">
                            <h3 className="text-lg font-medium text-gray-800">{data.name}</h3>
                            
                        </div>}
                    </li>
                    
                   
                </ul>
            </div>

        </div>
    )
}

export default GroupList
