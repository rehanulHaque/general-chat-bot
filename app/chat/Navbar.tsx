"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Bot } from "lucide-react";

export default function Navbar({ model, setModel }: { model: string; setModel: (m: string) => void }) {
  return (
    <nav className="w-full px-4 sm:px-8 py-4 bg-white border-b shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Bot className="w-7 h-7 text-blue-600" />
        <span className="text-xl font-bold text-blue-600">General Purpose Bot</span>
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GPT-4">GPT-4</SelectItem>
            <SelectItem value="GPT-3.5">GPT-3.5</SelectItem>
            <SelectItem value="Claude">Claude</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="default" className="px-6 font-semibold">
        Upgrade to Pro
      </Button>
    </nav>
  );
}
