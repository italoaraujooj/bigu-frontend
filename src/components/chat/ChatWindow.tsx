import { useContext, useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import socket from "@/services/socket";
import MessageInput from "./MessageInput";
import { AuthContext } from "@/context/AuthContext";
import WomanAvatar from "@/assets/woman.png";
import HomemAvatar from "@/assets/avatar.png";
import ChatHeader from "./ChatHeader";
import { getUserById } from "@/services/auth";
import { useRouter } from "next/router";

interface Message {
  id: string;
  sender: {
    _id: string;
    name?: string;
    profileImage?: any;
    sex?: string;
  };
  content: string;
  timestamp: string;
}

interface ChatWindowProps {
  messages: Message[];
  onSend: (message: string) => void;
  currentUserId: string;
  conversationId: string;
  participantId: string | null;
}

export default function ChatWindow({
  messages,
  onSend,
  currentUserId,
  conversationId,
  participantId,
}: ChatWindowProps) {
  const router = useRouter();
  const [chatMessages, setChatMessages] = useState(messages);
  const [participant, setParticipant] = useState<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(AuthContext);
  const queryParticipantId = router.query.participantId as string;

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
    if (queryParticipantId) {
      getUserById(queryParticipantId).then((res) => {
        setParticipant(res.data.user);
      });
    }
  }, [queryParticipantId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    setChatMessages(messages);
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newMessage = {
      chatRoomId: conversationId,
      content: text,
      userId: currentUserId,
    };

    socket.emit("sendMessage", newMessage);
    onSend(text);
  };

  return (
    <div className="flex flex-col flex-1 h-full text-white bg-[#121212]">
      {participant && (
        <ChatHeader
          userName={participant?.name || ""}
          profileImage={
            participant?.profileImage
              ? `data:image/jpeg;base64,${participant.profileImage}`
              : participant?.sex === "Feminino"
              ? WomanAvatar.src
              : HomemAvatar.src
          }
          sex={participant?.sex}
        />
      )}

      <div className="flex-1 flex flex-col overflow-y-auto px-4 py-2 gap-2 scrollbar-thin scrollbar-thumb-zinc-700">
        <div className="flex flex-col gap-2">
          {[...chatMessages].map((msg, index, arr) => {
            const isOwn = msg.sender._id === currentUserId;
            const isLastFromUser =
              index === arr.length - 1 ||
              arr[index + 1]?.sender._id !== msg.sender._id;

            const avatarUrl = isOwn
              ? user?.profileImage
                ? `data:image/jpeg;base64,${user.profileImage}`
                : user?.sex === "Feminino"
                ? WomanAvatar.src
                : HomemAvatar.src
              : participant?.profileImage
              ? `data:image/jpeg;base64,${participant.profileImage}`
              : participant?.sex === "Feminino"
              ? WomanAvatar.src
              : HomemAvatar.src;

            return (
              <div
                key={msg.id || index}
                className={`flex ${
                  isOwn ? "justify-end ml-10" : "justify-start mr-10"
                }`}
              >
                <div
                  className={`flex items-end gap-2 ${
                    isOwn ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {isLastFromUser ? (
                    <img
                      src={avatarUrl}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8" />
                  )}

                  <MessageBubble
                    message={msg.content}
                    isOwnMessage={isOwn}
                    timestamp={isLastFromUser ? msg.timestamp : undefined}
                  />
                </div>
              </div>
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
