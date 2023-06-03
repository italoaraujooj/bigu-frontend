import React from "react";
import OK from "../../assets/finished.png";
import Image from "next/image";
import Text from "../text";
import clsx from "clsx";

interface RacesHistory {
  id: number;
  origin_locale: string;
  destination: string;
  date: string;
  status: string;
}
function History({ races }: { races: any[] }) {
  return (
    <div className="bg-dark w-[98%] h-fit rounded-lg py-10 px-10 mx-auto lg:mx-0 lg:w-[30rem] 2xl:w-[40rem]">
      <h2 className="font-['Poppins'] text-2xl sm:text-3xl text-white font-bold pb-8">
        Seu histórico de caronas
      </h2>
      <div
        className={clsx(
          `w-full flex flex-col gap-3 overflow-y-scroll`,
          races?.length ? "h-80" : "h-fit"
        )}
      >
        {!races?.length && (
          <Text
            label="Nenhuma carona registrada"
            size="xl"
            color="gray"
            className="text-center"
          />
        )}
        {races?.map((race: RacesHistory) => (
          <div
            key={race.id}
            className="h-24 w-full px-6 py-6 border-light border-2 flex justify-between items-center gap-5 bg-zinc-800 hover:bg-zinc-700 rounded cursor-pointer transition-colors duration-600"
          >
            <Image src={OK} className="w-9 h-9" alt="race finished status" />
            <Text label="Catolé" color="gray" size="xl" />
            <div className="w-12 h-1 bg-light" />
            <Text label="UFCG" color="gray" size="xl" />
            <Text label="12 de abril às 7:35" color="gray" size="xl" />
          </div>
        ))}
      </div>
      <br />
      {!!races?.length && (
        <Text label="Ver mais" className="self-start cursor-pointer hover:text-stone-400" color="gray" size="md" />
      )}
    </div>
  );
}

export default History;
