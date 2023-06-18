import Image from "next/image";
import React from "react";
import Car from "../../../../assets/car.png";

type Props = {};

export default function Bar({}: Props) {
  return (
    <div>
      <Image className="w-10 h-10" src={Car} alt="car" />
      <div className="flex w-full h-32 items-end">
        <div className="w-2 h-20 bg-orange"></div>
        <div className="w-2 h-24 bg-yellow"></div>
        <div className="w-2 h-28 bg-light-blue"></div>
      </div>
    </div>
  );
}
