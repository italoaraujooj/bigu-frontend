import React, { useContext, useEffect, useState } from "react";
import ChatLayout from "@/components/chat/ChatLayout";
import ChatWindow from "@/components/chat/ChatWindow";
import {
  fetchUserConversations,
  fetchMessages,
  sendMessage,
  createOrGetChatRoom,
} from "@/services/chat";
import { AuthContext } from "@/context/AuthContext";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function ChatPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const { user } = useContext(AuthContext);
  const currentUserId = user?.userId || "";
  const router = useRouter();
  const { chatRoomId, participantId: queryParticipantId } = router.query;

  const loadConversations = async () => {
    if (!user) return;

    try {
      const response = await fetchUserConversations(user.userId);
      setConversations(response.data);
    } catch (error) {
      console.error("Erro ao buscar conversas:", error);
    }
  };

  useEffect(() => {
    loadConversations();
  }, [user]);

  // Exemplo: carregar as conversas ao abrir a tela
  useEffect(() => {
    loadConversations();
  }, []);

  const handleStartChat = async (rideId: string, participantId: string) => {
    if (!user) return;

    try {
      const response = await createOrGetChatRoom(
        rideId,
        user.userId,
        participantId
      );
      const chatRoomId = response.data.chatRoomId;

      // Seta o participantId que você acabou de usar
      setParticipantId(participantId);

      // Redireciona para a conversa
      router.push(
        `/chat?chatRoomId=${chatRoomId}&participantId=${participantId}`
      );

      // Atualiza a sidebar
      await loadConversations();
    } catch (error) {
      console.error("Erro ao iniciar o chat:", error);
      toast.error("Não foi possível iniciar a conversa.");
    }
  };

  useEffect(() => {
    if (chatRoomId && typeof chatRoomId === "string") {
      setSelectedConversationId(chatRoomId);
    }

    if (queryParticipantId && typeof queryParticipantId === "string") {
      setParticipantId(queryParticipantId);
    }
  }, [chatRoomId, queryParticipantId]);

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedConversationId) {
        const response = await fetchMessages(selectedConversationId);
        setMessages(response.data);
      }
    };
    loadMessages();
  }, [selectedConversationId]);

  const handleSend = async (message: string) => {
    if (selectedConversationId) {
      await sendMessage(selectedConversationId, message, user?.userId);
      const response = await fetchMessages(selectedConversationId);
      setMessages(response.data);
    }
  };

  if (!user) return null;

  return (
    <div className="w-screen h-screen bg-dark text-white">
      <ChatLayout
        sidebar={
          <ChatSidebar
            conversations={conversations}
            selectedChatId={setSelectedConversationId}
            onStartChat={handleStartChat}
            onRefresh={loadConversations}
          />
        }
        chatWindow={
          selectedConversationId ? (
            <ChatWindow
              messages={messages}
              onSend={handleSend}
              currentUserId={currentUserId}
              conversationId={selectedConversationId}
              participantId={participantId}
            />
          ) : (
            <div className="flex-1 h-screen flex items-center justify-center">
              <p className="text-white text-xl font-semibold">
                Selecione uma conversa
              </p>
            </div>
          )
        }
      />
    </div>
  );
}
