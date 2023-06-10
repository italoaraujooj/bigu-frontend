import { ArrowCircleLeft } from "@phosphor-icons/react";
import Text from "@/components/text";
import Avatar from "../assets/avatar.png"
import Image from "next/image";
import { Button } from "@/components";
import { useContext, useState } from "react";
import { RideContext } from "@/context/RideContext";
import RideFull from "@/components/rideFull";

function AvailableRides(){
    const { rides, history } = useContext(RideContext);
    console.log(rides)

    return (
      <div className=" flex justify-center items-center">
        <div className="w-[350px] flex flex-col gap-2">
          <div className="w-full flex gap-1 justify-start">
            <ArrowCircleLeft size={32} />
            <Text
              label="Voltar para tela inicial"
              className=" cursor-pointer hover:text-stone-400 "
              color="gray"
              size="xl"
            />
          </div>
          <div className=" w-full flex flex-col bg-container rounded-lg p-4 gap-3">
            <div className="flex gap-2">
              <Image src={Avatar} alt="avatar" className="w-10 h-10" />
              <Text
                label="Olá Joana, pesquise sua carona:"
                className=" cursor-pointer hover:text-stone-400 "
                color="white"
                size="xl"
                weight="bold"
              />
            </div>

            <div className=" w-full flex gap-2 justify-end">
              <Button label="Pesquisar" size="res" color="yellow" shape="square" text="black" />
              <Button label="Filtrar" size="res" color="yellow" shape="square" text="black" />
            </div>

            {!!rides && 
              rides.map((item, index) => (
                <div key={index}>
                  <RideFull
                      userName={item.driver.fullName}
                      start={item.start.nickname}
                      destination={item.destination.nickname}
                      numSeats={item.numSeats}
                      model={item.car.model}
                      plate={item.car.plate}
                      color={item.car.color}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
}

export default AvailableRides;