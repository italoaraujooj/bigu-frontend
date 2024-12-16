import { Car } from "@/services/car";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import Plus from "../../../assets/plus-green.png";
import { Actions, Attribute, Bar, Navigation } from "./components";
import { CarResponseDTO } from "@/types/ride";
import Modal from "@/components/modal";
import { VehicleType } from "@googlemaps/google-maps-services-js";

type Props = {
  profile?: boolean;
  add: () => void;
  remove: (id: string) => any;
  items: CarResponseDTO[];
};

const Carousel = (props: Props) => {
  const { profile, add, items } = props;
  console.log({items});
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedCar, setSelectedCar] = React.useState(0);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const memoizedPosition = React.useMemo(() => {
    const positions = [
      {
        className: "translate-x-[0%]",
      },
      {
        className: `translate-x-[-112.5%]`,
      },
      {
        className: `translate-x-[-225%]`,
      },
      {
        className: `translate-x-[-337.5%]`,
      },
    ];
    return positions[currentIndex].className;
  }, [currentIndex]);

  return (
    <div className="w-full">
      <div
        onMouseLeave={() => goToIndex(selectedCar)}
        className={clsx(
          `w-full flex items-center overflow-hidden space-x-12`,
          props.profile && "w-96"
        )}
      >
        {items?.length > 0 ? (
          items?.map((car: CarResponseDTO, index: number) => (
            <div
              key={car?.vehicleId}
              className={clsx(
                "w-full shrink-0",
                "transform-gpu",
                memoizedPosition,
                'duration-700 ease-["cubic-bezier(0.645, 0.045, 0.355, 1.000)"]'
              )}
            >
              <div className="flex items-start justify-between md:h-48 p-2 h-48 bg-white my-2 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  {car?.type && (<Bar type={car.type} />)}
                  <div className="w-3/4 flex-col items-center justify-between space-y-4 self-center">
                    <div className="flex items-center gap-12">
                      {/* @ts-ignore */}
                      <Attribute
                        label="Modelo"
                        value={car?.vehicleModel}
                        color="light-blue"
                      />
                      {/* @ts-ignore */}
                      <Attribute label="Cor" value={car?.color} color="yellow" />
                    </div>
                    <div className="w-full flex items-end justify-between gap-16">
                      {/* @ts-ignore */}
                      <Attribute label="Placa" value={car?.plate} color="orange" />
                      {/* @ts-ignore */}
                      <Actions
                        add={props.add}
                        edit={() => {}}
                        remove={() => {props.remove(car?.vehicleId)}}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full bg-white flex flex-col gap-5 rounded-lg justify-center items-center mx-auto py-3 md:px-1">
            <p className="text-xs md:text-sm text-gray pt-2 font-[Poppins]">
              Você não possui nenhum veículo cadastrado
            </p>
            {/* @ts-ignore */}
            <Image
              src={Plus}
              alt="add"
              className="w-8 h-8 cursor-pointer"
              onClick={props.add}
            />
          </div>
        )}
      </div>
      {/* @ts-ignore */}
      <Navigation length={items?.length} goToIndex={goToIndex} />
    </div>
  );
};

export default Carousel;
