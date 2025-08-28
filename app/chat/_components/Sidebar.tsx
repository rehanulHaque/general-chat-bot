"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOutIcon, Plus, Trash } from "lucide-react";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { redirect, useParams } from "next/navigation"

interface ChatTypes {
    id: string,
    title: string
    userId: string
}

export default function Sidebar() {
      const params = useParams<{ id: string }>();
      const { id } = params;
    const [open, setOpen] = useState(false);
    const [previousChatData, setPreviousChatData] = useState<ChatTypes[]>([])
    const previousChat = async () => {
        try {
            const response = await axios.get("/api/previousChat")
            setPreviousChatData(response.data.data)
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        previousChat()
    }, [])
    const reloadPage = () => {
        if(id){
            redirect("/chat")
        }else{
            window.location.reload()
        }
    }


    const deleteChat = async(chat_id: string) => {
        try {
            const response = await axios.delete(`/api/chat/${chat_id}`)
            setPreviousChatData(data => data.filter(chat => chat.id !== chat_id))
        } catch (error: any) {
            console.log(error)
        }
    }
    return (
        <>

            {/* Model select option (example placeholder) */}
            <div className="md:hidden fixed top-4 left-4 z-50 flex flex-col gap-2">
                {/* Example: Model select dropdown could go here */}
                {/* <Select ... /> */}
                <button
                    className="p-2 rounded-lg bg-white shadow-lg border border-gray-200"
                    onClick={() => setOpen(true)}
                    aria-label="Open sidebar"
                    style={{ display: open ? "none" : "block" }}
                >
                    <Menu className="w-6 h-6 text-gray-700" />
                </button>
            </div>

            {/* Sidebar overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/10 bg-opacity-40 z-40 transition-opacity ${open ? "block" : "hidden"} md:hidden`}
                onClick={() => setOpen(false)}
            />

            {/* Sidebar */}
            <aside
                className={`h-full bg-white border-r border-gray-200 flex flex-col shadow-sm fixed top-0 left-0 z-50 w-64 transition-transform duration-300 md:static md:w-full md:col-span-1 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                {/* Close icon for mobile */}
                <div className="md:hidden flex justify-end p-4">
                    <button onClick={() => setOpen(false)} aria-label="Close sidebar">
                        <X className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
                {/* Logo Section */}
                <div className="flex items-center justify-center h-20 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-blue-600">ChatBot</span>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-blue-500">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>

                {/* Chats Section */}
                <div className="flex-1 overflow-y-auto px-6 py-6 bg-white">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Chats</h2>
                    <ul className="space-y-2">
                        {previousChatData.map(item => (
                            <div key={item.id} className="flex gap-3 items-center justify-center">
                                <Link href={`/chat/${item.id}`} >
                                <Button variant={item.id == id ? "outline" : "ghost"} className="w-full justify-start text-gray-700 hover:bg-blue-50 rounded-lg px-3 py-2">
                                    <span className="font-medium">{item.title.slice(0, 15) + "..."}</span>
                                </Button>
                            </Link>
                            <Button variant={"secondary"} onClick={() => deleteChat(item.id)}><Trash/></Button>
                            </div>
                        ))}
                        
                    </ul>
                </div>

                {/* Add Chat Button */}
                <div className="p-4 border-t border-gray-100 space-y-2">
                    <Button className="w-full" onClick={reloadPage}>
                        <Plus /> New Chat
                    </Button>
                    <Button className="w-full">
                        <LogOutIcon /> Logout
                    </Button>
                </div>
            </aside>
        </>
    );
}
