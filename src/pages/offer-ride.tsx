import React, { useContext } from "react";
import { Text, Form } from '@/components';
import { AuthContext } from "@/context/AuthContext";
// @ts-ignore
import Woman from '../assets/woman.png';
import Image from "next/image";

type Props = {};

const OfferRide = ({ cars, addresses }: any) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex w-full items-center justify-center my-16">
      <div className="bg-dark w-[21rem] sm:w-528 lg:w-[64rem] h-fit rounded-lg px-4 py-8 lg:px-14 lg:py-16 space-y-12 mx-8">
        <header className="flex gap-4 items-center">
          <Image className="w-14 h-14" src={Woman} alt="woman-avatar" />
          <h1 className=" font-bold text-xl text-white">{`Ola, ${user?.fullName}!`}</h1>
        </header>
        <Form />
      </div>
    </div>
  );
};

export default OfferRide;
