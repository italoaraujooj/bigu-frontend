import { Button } from "@/components";
import RideFull from "@/components/rideFull";
import Text from "@/components/text";
import { AuthContext } from "@/context/AuthContext";
import { RideContext } from "@/context/RideContext";
import { ArrowCircleLeft } from "@phosphor-icons/react/dist/ssr/ArrowCircleLeft";
import Router from "next/router";
import { useContext } from "react";
import ghost from "../assets/ghost.json";
import LottieAnimation from "../components/LottieAnimation";

function AvailableRides() {
  const { rides, history } = useContext(RideContext);
  const { user } = useContext(AuthContext);

  const ridesWithDriver = rides?.filter(
    (element: any) => element.driver.userId !== user?.userId
  );

  return (
    <div className=" flex justify-center items-center pt-3 my-12">
      <div className="w-[90%] flex flex-col gap-2 lg:max-w-[1024px]">
        <div className="w-full flex gap-1 justify-start">
          <ArrowCircleLeft size={32} />
          <p
            className="cursor-pointer hover:text-stone-400 text-gray text-xl font-[Poppins]"
            onClick={() => Router.push("/dashboard")}
          >
            Voltar para tela inicial
          </p>
        </div>
        <div className=" w-full flex flex-col bg-container rounded-lg px-12 py-10 gap-3">
          <div className="flex gap-2 items-center">
            {/* <Image src={Avatar} alt="avatar" className="w-10 h-10" /> */}
            <Text
              label="Caronas disponíveis"
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

          {!!ridesWithDriver?.length ? (
            ridesWithDriver?.map((item: any, index: number) => (
              <div key={index}>
                <RideFull
                  id={item.id}
                  userName={item.driver.name}
                  start={item.start.district}
                  destination={item.destination.nickname}
                  numSeats={item.numSeats}
                  model={item.car.model}
                  plate={item.car.plate}
                  color={item.car.color}
                  dateTime={item.dateTime}
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

export default AvailableRides;
