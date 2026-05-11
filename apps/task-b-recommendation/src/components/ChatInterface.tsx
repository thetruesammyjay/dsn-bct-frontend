"use client";

import React, { useState } from "react";
import { Input, Button } from "ui";
import { Send } from "lucide-react";
import { ChatMessage } from "../types";

interface ChatInterfaceProps {
  history: ChatMessage[];
  onSendMessage: (msg: string) => void;
  isLoading: boolean;
}

export function ChatInterface({ history, onSendMessage, isLoading }: ChatInterfaceProps) {
  const [text, setText] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text);
    setText("");
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1 flex items-center gap-2">
        Conversation Agent
        <div className="h-px bg-border/50 flex-1" />
      </div>
      
      <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
        {history.map((msg, i) => (
          <div 
            key={i} 
            className={`p-3 rounded-lg text-sm leading-relaxed max-w-[85%] ${
              msg.role === "user" 
                ? "bg-[rgba(255,255,255,0.05)] text-[#E8EDF2] border border-border self-end" 
                : "bg-transparent text-muted-foreground self-start"
            }`}
          >
            {msg.role === "assistant" && <strong className="text-accent font-mono text-xs block mb-1">Agent</strong>}
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="text-accent font-mono text-xs animate-pulse">Typing...</div>
        )}
      </div>

      <form onSubmit={handleSend} className="relative mt-2">
        <Input 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Refine directions... (e.g. 'I want something cheaper')" 
          className="pr-12 focus-visible:border-[rgba(245,166,35,0.4)] focus-visible:ring-[rgba(245,166,35,0.2)]"
        />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-1 top-1 bottom-1 h-9 w-9 bg-accent text-[#080C10] hover:bg-[#ffb03a]"
          disabled={isLoading || !text.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
