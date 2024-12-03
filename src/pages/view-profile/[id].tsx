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
import { Attribute, Bar } from "@/components/profile/carousel/components";

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

  return (
    <div className="flex w-full items-center justify-center my-4 md:my-8">
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
          <div className="bg-dark w-[90vw] md:w-[85vw] lg:w-[90vw] xl:w-[80vw] 2xl:w-[80vw] sm:w-full p-4 rounded-2xl flex flex-col gap-6 md:p-16 space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
              <div className="flex justify-between self-start">
                {/* Bloco do nome, rating e status de verificação */}
                <div className="flex items-center self-start gap-3">
                  <div className="relative">
                    {userData?.sex === "Feminino" ?
                    <Image
                      className={`w-12 h-12 md:w-24 md:h-24 object-cover rounded-full transition duration-300`}
                      src={userData?.profileImage ? userData.profileImage : WomanAvatar}
                      alt="foto"
                    />
                    :
                    <Image
                      className={`w-12 h-12 md:w-24 md:h-24 object-cover rounded-full`}
                      src={userData?.profileImage ? userData.profileImage : Homem}
                      alt="foto"
                    />
                    }
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <h1 className="text-xl font-bold text-white md:text-4xl font-[Poppins]">
                        {userData?.name}
                      </h1>
                      <span className="text-gray text-[2rem] font-[Poppins]">⭐ {userData ? userData.avgScore.toFixed(1) : 0.0}</span>
                    </div>
                    <p className="text-gray italic text-md font-[Poppins]">
                      {userData?.isVerified ? 'Usuário Verificado' : 'Usuário Não Verificado'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bloco da barra e atributos */}
              <div className="flex items-center gap-6 bg-white p-4 pb-0 rounded-md">
                <Bar/>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <Attribute
                      label={userData?.sex === "Feminino" ? "MULHER" : "HOMEM"}
                      value={userData?.sex === "Feminino" ? "ELA/DELA" : "ELE/DELE"}
                      color="light-blue"
                    />
                    <Attribute
                      label={/estudante|ccc|ee/i.test(userData?.email ?? "") ? "ESTUDANTE" : "PROFESSOR"}
                      value="GRADUAÇÃO"
                      color="yellow"
                    />
                    <Attribute
                      label={`${userData?.offeredRidesCount} ${userData?.offeredRidesCount === 1 ? 'CARONA' : 'CARONAS'}`}
                      value="CONDUZIDAS"
                      color="orange"
                    />
                    <Attribute
                      label={`${userData?.takenRidesCount} ${userData?.takenRidesCount === 1 ? 'CARONA' : 'CARONAS'}`}
                      value="RECEBIDAS"
                      color="orange"
                    />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-12">
                <div className="w-full md:w-1/2 space-y-4 py-6">
                <h2 className="font-['Poppins'] text-xl sm:text-3xl text-white font-bold pb-4">
                    Avaliações
                </h2>

                    {ratings?.map((rating, index) => (
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
                    ))}

                </div>

              <div className="w-full h-1 bg-blackLine md:w-1 md:h-[32.5rem]"></div>

              <div className="w-full flex flex-col md:w-1/2 gap-4">
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
