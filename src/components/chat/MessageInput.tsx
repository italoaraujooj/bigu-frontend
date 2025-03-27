import React, { useRef } from "react";
import Input from "@/components/input/simpleInput";
import { Button } from "@/components";

interface MessageInputProps {
  onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      onSend(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex gap-2 px-4 py-2 border-t">
      <Input
        name="message"
        placeholder="Digite sua mensagem..."
        ref={inputRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") handleSend();
        }}
      />
      <Button label="Enviar" color="green" size="sm" onClick={handleSend} />
    </div>
  );
}
