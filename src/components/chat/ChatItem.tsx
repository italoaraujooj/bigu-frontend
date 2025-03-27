import React from "react";

interface ChatItemProps {
  name: string;
  lastMessage: string;
  timestamp: string;
  onClick: () => void;
  selected?: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({
  name,
  lastMessage,
  timestamp,
  onClick,
  selected = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer hover:bg-gray-100 ${
        selected ? "bg-gray-200" : ""
      }`}
    >
      <div className="font-bold">{name}</div>
      <div className="text-sm text-gray-600">{lastMessage}</div>
      <div className="text-xs text-gray-400">{timestamp}</div>
    </div>
  );
};

export default ChatItem;
