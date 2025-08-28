"use client"

import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User } from "lucide-react";
import JumpingDots from "../_components/JumpingDots";
import axios from "axios"
import Navbar from "../Navbar";
import { useParams } from 'next/navigation';

interface MessageTypes {
  id: number,
  sender: "user" | "assistant",
  content: string
}

interface PostResponseType {
  chatId: string,
  userMessage: {
    id: string,
    chatId: string,
    sender: "user",
    content: string
  },
  botMessage: {
    id: string,
    chatId: string,
    sender: "assistant",
    content: string
  }
}
export default function Page(){
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [chatId, setChatId] = useState<string>()
  const [messages, setMessages] = useState<MessageTypes[]>([
    { id: 1, sender: "assistant", content: "Hello how may i help you" },
  ]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("GPT-4");
  const [botTyping, setBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getMessages = async()=> {
    if (id && typeof id === "string") {
      setChatId(id);
    }
    const response = await axios.get(`/api/chat/${id}`)
    setMessages(response.data.data.messages);
    // console.log(messages)
  }
  useEffect(() => {
    getMessages()
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;
    setMessages([...messages, { id: messages.length + 1, sender: "user", content: input }]);
    setInput("");
    setBotTyping(true);

    try {
      const response = await axios.post<PostResponseType>("/api/chat", {
        messages,
        input,
        chatId
      })
      setMessages((msgs) => [
        ...msgs,
        { id: msgs.length + 1, content: response.data.botMessage.content, sender: response.data.botMessage.sender },
      ]);
    } catch (error: any) {
      console.log(error)
    } finally {
      setBotTyping(false);
    }
  };


  return (
    <div className="h-screen bg-gray-50 flex flex-col w-full relative">
      <Navbar model={model} setModel={setModel} />

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto py-8 flex flex-col items-center md:px-0 px-4md:px-0 px-4" style={{ scrollBehavior: 'smooth' }}>
        <div className="w-full max-w-3xl space-y-4">
          {messages && messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "assistant" && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                  <Bot className="text-blue-500 w-5 h-5" />
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-xl max-w-[80%] text-base font-medium shadow ${msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 border border-gray-200"
                  }`}
              >
                {msg.content}
              </div>
              {msg.sender === "user" && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                  <User className="text-gray-500 w-5 h-5" />
                </div>
              )}
            </div>
          ))}
          {botTyping && (
            <div className="flex items-end gap-2 justify-start">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                <Bot className="text-blue-500 w-5 h-5" />
              </div>
              <JumpingDots />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input box */}
      <form
        className="flex items-center gap-2 p-6 border-t bg-white justify-center w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <div className="w-full max-w-xl flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" variant="default" className="px-6">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}