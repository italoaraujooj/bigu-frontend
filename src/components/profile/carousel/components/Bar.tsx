import Image from "next/image";
import React from "react";
import Car from "../../../../assets/car.png";
import Moto from "../../../../assets/motorcycle.png";

type Props = {
  type: "CAR" | "MOTORCYCLE"; // Define os possíveis valores para a propriedade
};

export default function Bar({ type }: Props) {
  const imageSrc = type === "CAR" ? Car : Moto; // Escolhe a imagem com base no tipo
  if (!imageSrc) {
    return <div>Invalid vehicle type</div>; // Renderiza um fallback se o tipo for inválido
  }

  return (
    <div>
      <Image className="w-10 h-10" src={imageSrc} alt="car" />
      <div className="flex w-full h-32 items-end">
        <div className="w-2 h-20 bg-orange"></div>
        <div className="w-2 h-24 bg-yellow"></div>
        <div className="w-2 h-28 bg-light-blue"></div>
      </div>
    </div>
  );
}
