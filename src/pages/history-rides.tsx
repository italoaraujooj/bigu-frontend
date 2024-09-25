import { Button } from "@/components";
import RideHistoryFull from "@/components/rideHistoryFull";
import Text from "@/components/text";
import { AuthContext } from "@/context/AuthContext";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import ghost from "../assets/ghost.json";
import LottieAnimation from "../components/LottieAnimation";
import { RideResponseDTO } from "@/types/ride";
import { getAllRidesAvailable, getRideHistory } from "@/services/ride";
import { toast } from "react-toastify";
import Image from "next/image";
import Back from "../assets/CaretRight.svg";

function HistoryRides() {
  const [rides, setRides] = useState<RideResponseDTO[]>([])
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadDataRidesAvailable();
  }, []);

  const loadDataRidesAvailable = async () => {
    try {
      const responseHistory = await getRideHistory();
      console.log(responseHistory?.data.userHistory)
      setRides(responseHistory?.data.userHistory);
      setLoading(false);
    } catch (error) {
      toast.error("Ocorreu algum erro ao buscar as caronas no histórico.")
    }
  }

  return (
    <div className="flex justify-center items-center my-12">
      <div className="w-[90%] flex flex-col gap-2 lg:max-w-[1024px]">
        <div className="w-full flex gap-1 justify-start">
          <p
            className="cursor-pointer hover:text-stone-400 text-gray text-md font-[Poppins]"
            onClick={() => Router.push("/dashboard")}
          >
            Voltar para tela inicial
          </p>
        </div>
        <div className=" w-full flex flex-col rounded-lg gap-3">
          <div className="flex gap-2 items-center">
            <Text
              label="Histórico de Caronas"
              className=" cursor-pointer hover:text-stone-400 "
              color="white"
              size="lg"
              weight="bold"
            />
          </div>

          <div className=" w-full flex gap-2 justify-end items-center">
            <Button
              label="Pesquisar"
              size="res"
              color="yellow"
              shape="square"
            />
            <Button label="Filtrar" size="res" color="yellow" shape="square" />
          </div>
          {loading ?
            <div className="flex items-center justify-center">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-500 border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
              </div>
            </div>

            : rides?.length ? (
                rides.map((item: RideResponseDTO, index: number) => (
                <div key={index}>
                  <RideHistoryFull
                    id={item.rideId}
                    driver={item.driver}
                    start={item.startAddress.bairro}
                    destination={item.destinationAddress.bairro}
                    numSeats={item.numSeats}
                    model={item.car.carModel}
                    plate={item.car.plate}
                    color={item.car.color}
                    dateTime={item.scheduledTime}
                    toWoman={item.toWomen}
                  />
                </div>
              ))
            ) : (
              <div className="w-full flex items-center justify-center">
                <div className="w-64 h-64 ">
                  <LottieAnimation data={ghost} />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>


  );
}

export default HistoryRides;
