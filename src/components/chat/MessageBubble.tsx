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
      className={clsx("flex flex-col max-w-[75%]", {
        "self-end items-end": isOwnMessage, // Alinha à direita se for do próprio usuário
        "self-start items-start": !isOwnMessage, // Alinha à esquerda se for do outro
      })}
    >
      {showAvatar && avatarUrl && (
        <Image
          src={avatarUrl}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      )}
      <div
        className={clsx(
          "px-4 py-2 rounded-lg text-sm",
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
  );
}
