import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Avatar } from "../avatar/Avatar";
import clsx from "clsx";
import socket from "@/services/socket";
import { AuthContext } from "@/context/AuthContext";

interface Conversation {
  _id: string;
  otherParticipant: {
    _id: string;
    name: string;
    sex: string;
    profileImage?: string;
  };
  lastMessage?: {
    content: string;
  };
}

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedChatId: (id: string) => void;
  onStartChat: (rideId: string, participantId: string) => void;
  onRefresh: () => void;
}

export default function ChatSidebar({
  conversations,
  selectedChatId,
  onRefresh,
}: ChatSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const filteredConversations = conversations.filter((conversation) =>
    conversation.otherParticipant?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    socket.on("chatRoomCreated", ({ participantId, chatRoomId }) => {
      if (user?.userId === participantId) {
        onRefresh();
      }
    });

    return () => {
      socket.off("chatRoomCreated");
    };
  }, [user]);

  return (
    <aside className="w-[300px] border-r border-zinc-800 bg-zinc-900">
      <div className="p-4 border-b border-zinc-700">
        <input
          type="text"
          placeholder="Buscar conversa..."
          className="w-full bg-zinc-800 text-white px-3 py-2 rounded-md text-sm"
        />
      </div>

      {conversations.length === 0 ? (
        <p className="text-center text-sm text-zinc-400 mt-4">
          Nenhuma conversa encontrada
        </p>
      ) : (
        <div className="flex flex-col overflow-y-auto">
          {conversations.map((conversation: any) => (
            <div
              key={conversation._id}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-zinc-800",
                selectedChatId === conversation._id && "bg-zinc-700"
              )}
              onClick={() =>
                router.push(`/chat?chatRoomId=${conversation._id}&participantId=${conversation.otherParticipant._id}`)
              }
            >
              <Avatar
                src={
                  conversation.otherParticipant?.profileImage
                    ? `data:image/jpeg;base64,${conversation.otherParticipant.profileImage}`
                    : undefined
                }
                fallback={conversation.otherParticipant?.name?.charAt(0)}
              />
              <div className="flex flex-col">
                <span className="font-medium">
                  {conversation.otherParticipant?.name || "Usuário"}
                </span>
                <span className="text-xs text-gray-400 truncate w-40">
                  {conversation.lastMessage?.content || "Sem mensagens"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
