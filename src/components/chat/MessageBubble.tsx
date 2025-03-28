import React from "react";
import clsx from "clsx";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Image from "next/image";

interface MessageBubbleProps {
  message: string;
  isOwnMessage: boolean;
  timestamp?: string; // agora opcional
  showAvatar?: boolean;
  avatarUrl?: string;
}

export default function MessageBubble({
  message,
  isOwnMessage,
  timestamp,
  showAvatar,
  avatarUrl,
}: MessageBubbleProps) {
  const formattedTime =
    timestamp &&
    format(new Date(timestamp), "dd/MM/yyyy HH:mm", {
      locale: ptBR,
    });

  return (
    <div
      className={clsx("flex items-end gap-2 max-w-[75%]", {
        "self-end flex-row-reverse": isOwnMessage,
        "self-start flex-row": !isOwnMessage,
      })}
    >
      {/* Avatar */}
      {showAvatar && avatarUrl && (
        <Image
          src={avatarUrl}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      )}

      {/* Mensagem + Timestamp */}
      <div className="flex flex-col">
        <div
          className={clsx(
            "px-4 py-2 rounded-lg text-sm break-words",
            isOwnMessage
              ? "bg-amber-500 text-white rounded-br-none"
              : "bg-zinc-700 text-white rounded-bl-none"
          )}
        >
          {message}
        </div>
        {formattedTime && (
          <span className="text-xs text-gray-400 mt-1">{formattedTime}</span>
        )}
      </div>
    </div>
  );
}
