import { formatarDate } from "@/utils/masks";
import clsx from "clsx";
import Image from "next/image";
import OK from "../../assets/finished.png";
import ghost from "../../assets/ghost.json";
import LottieAnimation from "../LottieAnimation";
import Text from "../text";

interface RacesHistory {
  id: number;
  origin_locale: string;
  date: string;
  status: string;
  start: {
    nickname: string;
  };
  destination: {
    nickname: string;
  };
  dateTime: string;
}

function History({ races }: { races: any[] }) {
  return (
    <div className="bg-dark w-[98%] h-fit rounded-lg py-6 px-6 flex flex-col mx-auto lg:mx-0 lg:w-[30rem] 2xl:w-[40rem]">
      <h2 className="font-['Poppins'] text-xl sm:text-3xl text-white font-bold pb-8">
        Histórico de caronas
      </h2>
      <div
        className={clsx(
          `flex flex-col gap-3`,
          races?.length ? "h-80" : "h-fit"
        )}
      >
        {!races?.length && (
          <div className="w-full flex items-center justify-center">
            <div className="w-64 h-64 ">
              {/* @ts-ignore */}
              <LottieAnimation data={ghost} />
            </div>
          </div>
        )}
        {races?.map((race: RacesHistory) => (
          <div
            key={race.id}
            className="h-24 w-full px-6 py-6 border-light border-2 flex justify-between items-center gap-5 bg-zinc-800 hover:bg-zinc-700 rounded cursor-pointer transition-colors duration-600"
          >
            {/* @ts-ignore */}
            <Image src={OK} className="w-7 h-7" alt="race finished status" />
            {/* @ts-ignore */}
            <Text label={race?.start?.nickname} color="gray" size="md" />
            <div className="w-12 h-1 bg-light" />
            {/* @ts-ignore */}
            <Text label={race?.destination?.nickname} color="gray" size="md" />
            {/* @ts-ignore */}
            <Text label={formatarDate(race?.dateTime)} color="gray" size="md" />
          </div>
        ))}
      </div>
      <footer className="pt-4">
        <p className=" text-gray text-base self-start hover:text-stone-400 cursor-pointer font-[Poppins]">
          Ver mais
        </p>
      </footer>
    </div>
  );
}

export default History;
