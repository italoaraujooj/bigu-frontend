import { Card, CardContent } from "@/components/card/Card";
import Homem from "@/assets/avatar.png";
import Mulher from "@/assets/woman.png";
import Image from "next/image";

interface ChatHeaderProps {
  userName: string;
  profileImage?: string;
  sex?: "Masculino" | "Feminino";
}

export default function ChatHeader({
  userName,
  profileImage,
  sex = "Masculino",
}: ChatHeaderProps) {
  const imageSource = profileImage || (sex === "Feminino" ? Mulher : Homem);

  return (
    <Card className="bg-zinc-800 text-white border-none rounded-none">
      <CardContent className="flex items-center gap-3 py-3">
        <div className="w-10 h-10 rounded-full overflow-hidden relative">
          <Image
            src={imageSource}
            alt="avatar"
            fill
            className="object-cover "
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{userName}</span>
          <span className="text-xs text-zinc-400">Online</span>
        </div>
      </CardContent>
    </Card>
  );
}
