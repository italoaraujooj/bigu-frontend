import { useContext, useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import socket from "@/services/socket";
import MessageInput from "./MessageInput";
import { AuthContext } from "@/context/AuthContext";
import WomanAvatar from "@/assets/woman.png";
import HomemAvatar from "@/assets/avatar.png";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

interface ChatWindowProps {
  messages: Message[];
  onSend: (message: string) => void;
  currentUserId: string;
  conversationId: string;
}

export default function ChatWindow({
  messages,
  onSend,
  currentUserId,
  conversationId,
}: ChatWindowProps) {
  const [chatMessages, setChatMessages] = useState(messages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    socket.emit("joinRoom", conversationId);

    socket.on("newMessage", (msg) => {
      setChatMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = (text: string) => {
    const newMessage = {
      chatRoomId: conversationId,
      senderId: currentUserId,
      content: text,
      userId: user?.userId,
    };

    socket.emit("sendMessage", newMessage);
    onSend(text);
  };

  return (
    <div className="flex flex-col flex-1 h-full text-white bg-[#121212]">
      <div className="flex-1 flex flex-col-reverse overflow-y-auto px-4 py-2 gap-2">
        <div className="flex flex-col-reverse gap-2">
          {[...chatMessages].reverse().map((msg, index, arr) => {
            const isOwn = msg.senderId === currentUserId;
            const isLastOwnMessage =
              isOwn &&
              (index === 0 || arr[index - 1]?.senderId !== currentUserId);
            const current = msg;
            const next = arr[index - 1]; // mensagem mais nova (acima na tela)

            let showTimestamp = true;

            if (next && current.senderId === next.senderId) {
              const currentTime = new Date(current.timestamp).getTime();
              const nextTime = new Date(next.timestamp).getTime();
              const diffMinutes =
                Math.abs(currentTime - nextTime) / (1000 * 60);

              if (diffMinutes <= 30) {
                // se for dentro de 30min e mesmo autor, não mostra agora
                showTimestamp = false;
              }
            }
            return (
              <MessageBubble
                key={current.id}
                message={current.content}
                isOwnMessage={current.senderId === currentUserId}
                showAvatar={isLastOwnMessage}
                timestamp={showTimestamp ? current.timestamp : undefined}
                avatarUrl={
                  isLastOwnMessage && user?.profileImage
                    ? `data:image/jpeg;base64,${user.profileImage}`
                    : user?.sex === "Feminino"
                    ? WomanAvatar.src
                    : HomemAvatar.src
                }
              />
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-zinc-600 px-4 py-2 bg-[#181818]">
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
