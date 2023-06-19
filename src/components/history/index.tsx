import React from "react";
import OK from "../../assets/finished.png";
import Image from "next/image";
import Text from "../text";
import clsx from "clsx";
import { formatarDate } from "@/utils/masks";

interface RacesHistory {
  id: number;
  origin_locale: string;
  destination: string;
  date: string;
  status: string;
}
function History({ races }: { races: any[] }) {
  return (
    <div className="bg-dark w-full h-fit rounded-lg py-6 px-6 mx-auto lg:mx-0 lg:w-[30rem] 2xl:w-[40rem]">
      <h2 className="font-['Poppins'] text-xl sm:text-3xl text-white font-bold pb-8">
        Histórico de caronas
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
            <Image src={OK} className="w-7 h-7" alt="race finished status" />
            <Text label={race?.start?.nickname} color="gray" size="md" />
            <div className="w-12 h-1 bg-light" />
            <Text label={race?.destination?.nickname} color="gray" size="md" />
            <Text label={formatarDate(race?.dateTime)} color="gray" size="md" />
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
