import React, { useContext } from "react";
import { Text, Form } from '@/components';
import { AuthContext } from "@/context/AuthContext";
import Woman from "../assets/woman.png";
import Image from "next/image";

type Props = {};

const OfferRide = ({ cars, addresses }: any) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex w-full items-center justify-center my-16">
      <div className="bg-dark w-[21rem] md:w-528 lg:w-[64rem] h-fit rounded-lg px-6 py-8 lg:px-14 lg:py-16 space-y-12 mx-8">
        <header className="flex gap-4 items-center">
          <Image className="w-20 h-20" src={Woman} alt="woman-avatar" />
          <Text label={`Ola, ${user?.fullName}!`} size="lg" weight="bold" />
        </header>
        <Form />
      </div>
    </div>
  );
};

export default OfferRide;
