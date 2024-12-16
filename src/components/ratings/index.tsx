import { RatingResponseDTO } from "@/types/ride";
import { formatarData } from "@/utils/masks";
import Image from "next/image";
import Homem from "../../assets/avatar.png";
import WomanAvatar from "../../assets/woman.png";
import LottieAnimation from "../../components/LottieAnimation";
import ghost from "../../assets/ghost.json";

type Props = {
  ratings: RatingResponseDTO[];
};

const Ratings = (props: Props) => {
  const { ratings } = props;

  return (
    <div className="bg-dark w-full h-fit rounded-lg py-6 flex flex-col mx-auto lg:mx-0 max-w-[800px]">
      <h2 className="font-['Poppins'] text-center text-xl sm:text-3xl text-white font-bold pb-8">
        Avaliações
      </h2>

      {ratings?.length > 0 ? (
        ratings?.map((rating, index) => (
          <div
            key={index}
            className="flex flex-col bg-white rounded-lg p-4 mb-4"
          >
            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {rating.raterSex === "Feminino" ? (
                    <Image
                      className="w-12 h-12 md:w-24 md:h-24 object-cover rounded-full transition duration-300"
                      src={WomanAvatar}
                      alt="foto"
                    />
                  ) : (
                    <Image
                      className="w-8 h-8 md:w-16 md:h-16 object-cover rounded-full"
                      src={Homem}
                      alt="foto"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <p className="text-xl font-bold text-black font-[Poppins]">
                    {rating.raterName}
                  </p>
                </div>
              </div>
              <div className="justify-end">
                <span className="text-black font-[Poppins] font-bold text-[1.5rem] pt-1">
                  ⭐ {rating.raterName ? rating.score.toFixed(1) : 0.0}
                </span>
              </div>
            </div>

            <div className="flex-grow mt-4">
              <p className="font-['Poppins'] text-black my-2">
                {rating.comment}
              </p>
              <div className="flex font-['Poppins'] text-gray-600 text-sm">
                <span>⏰ {formatarData(rating.createdAt)}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex items-center justify-center">
          <div className="w-64 h-64">
            {/* @ts-ignore */}
            <LottieAnimation data={ghost} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Ratings;
