import React, { useState } from "react";
import ChatItem from "@/components/chat/ChatItem";
import ScrollArea from "@/components/scrollArea/ScrollArea";
import Input from "@/components/input/input";

interface Conversation {
  id: string;
  name: string;
  lastMessage?: string;
  timestamp?: string;
  avatarUrl?: string;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  onSelectConversation: (id: string) => void;
}

export default function ChatSidebar({
  conversations,
  onSelectConversation,
}: ChatSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full text-white bg-zinc-900 h-full flex flex-col border-r border-gray-200">
      <div className="p-4">
        <input
          placeholder="Buscar conversa..."
          className="w-full p-2 text-black"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="flex-1">
        {filteredConversations.map((conversation) => (
          <ChatItem
            key={conversation.id}
            name={conversation.name}
            lastMessage={conversation.lastMessage || ""}
            timestamp={conversation.timestamp || ""}
            onClick={() => onSelectConversation(conversation.id)}
          />
        ))}
        {filteredConversations.length === 0 && (
          <div className="text-center text-gray-500 text-sm py-4">
            Nenhuma conversa encontrada
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
