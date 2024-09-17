import Text from "@/components/text";
import React from "react";

type Props = {};

const Ticket = (props: Props) => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="bg-dark w-[64rem]	 h-fit rounded-lg px-14  space-y-14 ">
        <header className="z-50">
          <Text label="Seu ticket de carona" weight="bold" size="lg" className="z-[400rem]"/>
        </header>
        <div className="relative w-[12rem] h-64 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg px-10 py-4">
          <Text label="TICKET DO BIGU" size="md" weight="bold" className="text-center tracking-widest mb-6 text-neutral-800" />
          <div className="metade-circulo absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-3/4 w-12 h-12 rounded-full bg-dark mx-auto rotate-90 shadow-xl"></div>
          <div className="absolute left-0 inset-y-1/3 w-64 h-1 bg-dark opacity-10 mt-[2rem]"></div>
          <div className="metade-circulo absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-3/4 w-12 h-12 rounded-full bg-dark mx-auto rotate-[-90deg]"></div>
          <div className="absolute inset-y-1/2 mt-2">
            <div className="w-20 h-6 bg-white rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
