import { formatarDate } from "@/utils/masks";
import clsx from "clsx";
import Image from "next/image";
import OK from "../../assets/finished.png";
import ghost from "../../assets/ghost.json";
import LottieAnimation from "../LottieAnimation";
import Text from "../text";
import { RideResponseDTO } from "@/types/ride";
import { useContext, useEffect, useState } from "react";
import RatingForm from "../ratingForm";
import Router from "next/router";
import { AuthContext } from "@/context/AuthContext";

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

interface Props {
  races: RideResponseDTO[];
  loading: boolean;
}

function History(props: Props) {
  const { races, loading } = props;
  const { user } = useContext(AuthContext);

  const [showRatingForm, setShowRatingForm] = useState(false);
  const [rateeId, setRateeId] = useState<string>("");
  const [rateeName, setRateeName] = useState<string>("");
  const [rideId, setRideId] = useState<string>("");
  const [editRating, setEditRating] = useState<string>("");
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);

  const handleCloseRatingForm = () => setShowRatingForm(false);
  const handleOpenRatingForm = () => setShowRatingForm(true);

  const handleViewProfile = async (userId: string) => {
    Router.push(`/view-profile/${userId}`);
  };

  return (
    <div className="bg-dark w-full h-fit rounded-lg py-6 px-4 flex flex-col lg:mx-0 lg:w-full max-w-[800px]">
      <h2 className="font-['Poppins'] text-center text-2xl text-white font-bold sm:text-xl md:text-2xl pb-4">
        Histórico de caronas
      </h2>
      <div
        className={clsx(
          `flex flex-col gap-3`,
          races?.length ? "h-80" : "h-fit"
        )}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-500 border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </div>
        ) : races.length ? (
          races.slice(0, 3).map((race: RideResponseDTO) => (
            <div>
              <div
                key={race.rideId}
                className={clsx(
                  "flex flex-col w-full px-6 py-6 border-light border-2 gap-5 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors duration-600",
                  "bg-white rounded-xl transition-[max-height] duration-500 ease-in-out max-h-20 hover:max-h-96 overflow-hidden"
                )}
              >
                <div className="flex justify-between items-center">
                  <Image
                    src={OK}
                    className="w-7 h-7"
                    alt="race finished status"
                  />
                  <Text
                    label={race.startAddress.bairro}
                    color="gray"
                    size="md"
                    className="text-xs sm:text-sm md:text-base"
                  />
                  <div className="w-12 h-1 bg-light" />
                  <Text
                    label={race.destinationAddress.bairro}
                    color="gray"
                    size="md"
                    className="text-xs sm:text-sm md:text-base"
                  />
                  <Text
                    label={formatarDate(race.scheduledTime)}
                    color="gray"
                    size="md"
                    className="text-xs sm:text-sm md:text-base"
                  />
                </div>

                {/* Conteúdo adicional para quando expandir */}
                <div className="space-y-2 pt-2 whitespace-nowrap flex flex-col gap-2">
                  <Text
                    label={`🚖 MOTORISTA:`}
                    color="dark"
                    size="md"
                    weight="medium"
                    className="tracking-wide text-xs md:text-md text-white"
                  />
                  <div
                    key={race.driver.userId}
                    className="flex items-center bg-zinc-700 px-4 py-2 rounded-md mb-4"
                  >
                    <p>
                      <span
                        onClick={() => {
                          if (race.driver.userId !== user?.userId) {
                            handleViewProfile(race.driver.userId);
                          }
                        }}
                        className="cursor-pointer hover:text-blue-500
                        tracking-wide text-xs md:text-md text-white
                        font-[Poppins]"
                      >
                        -{" "}
                        {race.driver.userId !== user?.userId
                          ? race.driver.name
                          : "Você"}
                      </span>
                    </p>
                    {race.members.includes(user?.userId) &&
                      race.driver.userId !== user?.userId && (
                        <span
                          className="animate-pulse text-yellow-500 ease-in-out infinite font-[Poppins] cursor-pointer ml-4"
                          onClick={() => {
                            handleOpenRatingForm();
                            setRateeId(race.driver.userId);
                            setRateeName(race.driver.name);
                            setRideId(race.rideId);
                          }}
                        >
                          ⭐ Avaliar
                        </span>
                      )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Text
                      label={`🙋 MEMBROS:`}
                      color="dark"
                      size="md"
                      weight="medium"
                      className="tracking-wide text-xs md:text-md text-white"
                    />
                    {race.members && race.members.length > 0 ? (
                      race.members.map((member, index) => (
                        <div
                          key={member.user.userId}
                          className="flex items-center bg-zinc-700 px-4 py-2 rounded-md mb-4"
                        >
                          <p>
                            <span
                              onClick={() => {
                                if (member.user.userId !== user?.userId) {
                                  handleViewProfile(member.user.userId);
                                }
                              }}
                              className="cursor-pointer hover:text-blue-500
                        tracking-wide text-xs md:text-md text-white
                        font-[Poppins]"
                            >
                              -{" "}
                              {member.user.userId !== user?.userId
                                ? member.user.name
                                : "Você"}
                            </span>
                          </p>
                          {(race.members.includes(user?.userId) ||
                            race.driver.userId === user?.userId) &&
                            member.user.userId !== user?.userId && (
                              <span
                                className="animate-pulse text-yellow ease-in-out infinite font-[Poppins] cursor-pointer ml-4"
                                onClick={() => {
                                  handleOpenRatingForm();
                                  setRateeId(member.user.userId);
                                  setRateeName(member.user.name);
                                  setRideId(race.rideId);
                                }}
                              >
                                ⭐ Avaliar
                              </span>
                            )}
                        </div>
                      ))
                    ) : (
                      <Text label="Nenhum membro." color="gray" size="md" />
                    )}
                  </div>
                </div>
              </div>
              <RatingForm
                visible={showRatingForm}
                handleClose={handleCloseRatingForm}
                rideId={rideId}
                rateeId={rateeId}
                rateeName={rateeName}
                // setShouldFetch={setShouldFetch}
                // setEditRating={}
              />
            </div>
          ))
        ) : (
          <div className="w-full flex items-center justify-center">
            <div className="w-64 h-64 ">
              {/* @ts-ignore */}
              <LottieAnimation data={ghost} />
            </div>
          </div>
        )}
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
