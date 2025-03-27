import React from "react";

interface ChatLayoutProps {
  sidebar: React.ReactNode;
  chatWindow: React.ReactNode;
}

export default function ChatLayout({ sidebar, chatWindow }: ChatLayoutProps) {
  return (
    <div className="flex w-full h-screen font-['Poppins'] bg-[#121212f5] text-white overflow-hidden">
      <aside className="w-[300px] h-full border-r border-zinc-800 bg-zinc-900 flex flex-col">
        {sidebar}
      </aside>
      <main className="flex-1 h-full flex flex-col">{chatWindow}</main>
    </div>
  );
}
