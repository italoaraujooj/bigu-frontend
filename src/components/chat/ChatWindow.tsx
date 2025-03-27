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
            const isLastOwnMessage =
              index === arr.length - 1 ||
              arr[index + 1]?.sender._id !== msg.sender._id;

            const current = msg;
            const next = arr[index + 1];

            let showTimestamp = true;
            if (next && current.sender._id === next.sender._id) {
              const currentTime = new Date(current.timestamp).getTime();
              const nextTime = new Date(next.timestamp).getTime();
              const diffMinutes =
                Math.abs(currentTime - nextTime) / (1000 * 60);
              if (diffMinutes <= 30) showTimestamp = false;
            }

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

            // Define margem lateral para alinhar bolhas com ou sem avatar
            const bubbleMargin =
              !isOwn && !isLastOwnMessage
                ? "ml-10"
                : isOwn && !isLastOwnMessage
                ? "mr-10"
                : "";

            return (
              <div
                key={current.id || index}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex ${
                    isOwn ? "flex-row-reverse" : "flex-row"
                  } gap-2 items-end`}
                >
                  <MessageBubble
                    message={current.content}
                    isOwnMessage={isOwn}
                    timestamp={showTimestamp ? current.timestamp : undefined}
                  />

                  {isLastOwnMessage && (
                    <img
                      src={avatarUrl}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
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
