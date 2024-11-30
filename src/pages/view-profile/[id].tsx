import Text from "@/components/text";
import { AuthContext } from "@/context/AuthContext";
import { getUserById } from "@/services/auth";
import { getUserRatings } from "@/services/ratings";
import { RatingResponseDTO, UserResponseDTO } from "@/types/ride";
import { ArrowCircleLeft } from "@phosphor-icons/react/dist/ssr/ArrowCircleLeft";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import WomanAvatar from "../../assets/woman.png";
import History from "@/components/history";
import Homem from "../../assets/avatar.png"
import { formatarData } from "@/utils/masks";
import { getRideHistoryUser } from "@/services/ride";
import Star from "../../assets/star.png";
import ghost from "../../assets/ghost.json";
import LottieAnimation from "../../components/LottieAnimation";

function Profile() {
  const router = useRouter();
  const { id } = router.query;
  
  const { user, setUser } = useContext(AuthContext);

  const [userData, setUserData] = useState<UserResponseDTO>();
  const [history, setHistory] = useState([]);
  const [loadingStateHistory, setLoadingStateHistory] = useState<boolean>(true);
  const [ratings, setRatings] = useState<RatingResponseDTO[]>([]);


  useEffect(() => {
    if (id) {
      loadDataUser();
      loadDataRatings();
      loadDataHistory();
    }
  }, [id]);

  const loadDataUser = async () => {
    const responseUser = await getUserById(id as string);
    if (responseUser) setUserData(responseUser.data.user);
  };

  const loadDataRatings = async () => {
    const responseRatings = await getUserRatings(id as string);
    if (responseRatings) setRatings(responseRatings.data.ratings);
  };

  const loadDataHistory = async () => {
    try{
      const responseHistory = await getRideHistoryUser(id as string);
      setHistory(responseHistory.data.userHistory);
    }finally{
      setLoadingStateHistory(false);
    }
  }

  console.log(user)

  return (
    <div className="w-full max-w-[90%] mx-auto">
      <div>
        <div>
          <Link
            href="/dashboard"
            className="text-gray flex items-center gap-2 mb-4"
          >
            <ArrowCircleLeft size={32} />
            <Text
              label="Voltar para tela inicial"
              className=" cursor-pointer hover:text-stone-400 "
              color="gray"
              size="xl"
            />
          </Link>
        </div>
        <div className="w-full h-fit flex items-center justify-center">
        <div
            className="bg-dark w-full rounded-lg px-4 py-6 flex flex-col mx-auto max-w-[800px] gap-4 lg:mx-0 lg:w-full sm:py-4 sm:px-8"
            >
            <div className="flex items-center text-white gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                {userData?.sex === "Feminino" ?
                  <Image
                    className="w-12 h-12 md:w-24 md:h-24 rounded-full"
                    src={userData?.profileImage ? userData.profileImage : WomanAvatar}
                    alt="foto"
                  />
                  :
                  <Image
                    className="w-12 h-12 md:w-24 md:h-24 rounded-full"
                    src={userData?.profileImage ? userData.profileImage : Homem}
                    alt="foto"
                  />
                }
              </div>
              <div className="flex gap-2">
                <div>
                  <h2 className="text-3xl font-bold text-white md:text-4xl font-[Poppins]">{user?.name.split(" ")[0]}</h2>
                  {userData?.isVerified ?
                  <p className="text-[12px] font-semibold text-gray-400 font-[Poppins]">Usuário verificado</p> :
                  <p className="text-[12px] font-semibold text-gray-400 font-[Poppins]">Usuário não verificado</p> }
                </div>
                <div className="flex items-start mb-3">
                  <Image className="w-3 h-3 self-center" src={Star} alt="estrela" />
                  <span className="ml-2 text-[12px] font-[Poppins] self-center">{user?.avgScore}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex h-20 items-end">
                <div className="w-2 h-10 bg-orange"></div>
                <div className="w-2 h-12 bg-yellow"></div>
                <div className="w-2 h-14 bg-light-blue"></div>
              </div>

              <div className="flex flex-col self-end text-gray font-medium text-xs md:text-lg">
                <div className="font-[Poppins] bg-orange w-full px-4 py-2 flex items-center justify-center rounded-md font-bold text-white text-sm md:text-lg md:p-4">
                  {`${userData?.offeredRidesCount} CARONAS`}
                </div>
                <span className="font-[Poppins] self-center">CONDUZIDAS</span>
              </div>

              <div className="flex flex-col self-end text-gray font-medium text-xs md:text-lg">
                <div className="font-[Poppins] bg-yellow w-full px-4 py-2 flex items-center justify-center rounded-md font-bold text-white text-sm md:text-lg md:p-4">
                  {`${userData?.takenRidesCount} CARONAS`}
                </div>
                <span className="font-[Poppins] self-center">RECEBIDAS</span>
              </div>
            </div>

            <div className="w-full h-full flex flex-col md:flex-row gap-12">
              <div className="bg-dark w-[98%] h-fit rounded-lg py-6 flex flex-col mx-auto lg:mx-0 lg:w-full max-w-[800px]">
                <h2 className="font-['Poppins'] text-center text-xl sm:text-3xl text-white font-bold pb-8">
                  Avaliações
                </h2>

                { ratings?.length > 0 ? ratings?.map((rating, index) => (
                  <div key={index} className="flex flex-col bg-white rounded-lg p-4 mb-4">
                    <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {user?.sex === "Feminino" ? (
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
                            {user?.name}
                          </p>
                        </div>
                      </div>
                      <div className="justify-end">
                        <span className="text-black font-[Poppins] font-bold text-[1.5rem] pt-1">⭐ {rating.raterName ? rating.score.toFixed(1) : 0.0}</span>
                      </div>
                    </div>

                    <div className="flex-grow mt-4">
                      <p className="text-black my-2">{rating.comment}</p>
                      <div className="flex text-gray-600 text-sm">
                        <span>⏰ {formatarData(rating.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                )) :
                <div className="w-full flex items-center justify-center">
                  <div className="w-64 h-64 ">
                    {/* @ts-ignore */}
                    <LottieAnimation data={ghost} />
                  </div>
                </div>
                }
              </div>

              <div className="w-full h-1 bg-blackLine md:w-1 md:h-[32.5rem]"></div>

              <div className="w-full h-1/2 flex flex-col md:w-1/2 gap-4">
                <History races={history} loading={loadingStateHistory} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
