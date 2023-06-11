import React, { useEffect } from "react";
import Car from "../../../assets/car.png";
import CarSecondary from "../../../assets/car-secondary.png";
import clsx from "clsx";
import Image from "next/image";
import Text from "../../text";
import SportCar from "../../../assets/sport-car.png";
import Trash from "../../../assets/trash.png";
import Plus from "../../../assets/plus-green.png";
import Edit from "../../../assets/edit.png";
import { getUserCars } from "@/services/car";

type Props = {
  profile?: boolean;
  add: any;
};

// interface CarsGarageProps {
//   car: typeof Car;
//   id: number;
//   userId: number;
//   brand: string;
//   model: string;
//   model_year: number;
//   color: string;
//   plate: string;
// }

const Carousel = (props: Props) => {
  // const items = [
  //   {
  //     id: 1,
  //     model: "COROLLA PRATA",
  //     car: Car,
  //   },
  //   {
  //     id: 2,
  //     model: "GOLF BRANCO",
  //     car: CarSecondary,
  //   },
  // ] as CarsGarageProps[];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedCar, setSelectedCar] = React.useState(0);
  const [porcentage, setPorcentage] = React.useState(0);
  const [vacancies, setVacancies] = React.useState(0);
  const [items, setItems] = React.useState([] as any);
  console.log(items);

  useEffect(() => {
    const loadData = async () => {
      getUserCars().then((response) => {
        setItems(response);
      });
    };
    loadData();
  }, []);

  const toggleCar = (index: number) => {
    setSelectedCar(index);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    // setPorcentage(index * 110.5);
  };

  const memoizedPosition = React.useMemo(() => {
    // Cálculo baseado em `position`
    const positions = [
      {
        className: "translate-x-[0%]",
      },
      {
        className: `translate-x-[-110.5%]`,
      },
    ];
    const positionsLg = [
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
    return props.profile
      ? positionsLg[currentIndex].className
      : positions[currentIndex].className;
  }, [currentIndex, props?.profile]);

  console.log(currentIndex);
  return (
    <div className="w-full">
      <div
        onMouseLeave={() => goToIndex(selectedCar)}
        className={clsx(
          `w-full flex items-center overflow-hidden space-x-12`,
          props.profile && "w-96"
        )}
      >
        {!!items &&
          !props.profile &&
          items?.map(({ id, model, car }, index) => (
            <div
              key={id}
              className={clsx(
                "w-full shrink-0",
                "transform-gpu",
                memoizedPosition,
                'duration-700 ease-["cubic-bezier(0.645, 0.045, 0.355, 1.000)"]'
              )}
            >
              <div className="w-full h-20 bg-extralight px-6 rounded-lg flex items-center justify-between ">
                <Image
                  className="w-10 h-10 lg:w-12 lg:h-12"
                  src={car}
                  alt="car"
                />
                <Text
                  label={model}
                  size="md"
                  color="gray"
                  weight="medium"
                  className="text-sm lg:text-md"
                />
                <button
                  type="button"
                  className="h-12 font-family bg-green rounded-lg text-white font-semibold text-sm lg:text-base px-4 lg:px-6 flex items-center justify-between gap-3 lg:gap-6 uppercase tracking-tight hover:bg-hover-green"
                >
                  <div
                    className="relative w-6 h-6 rounded-full bg-white flex items-center justify-center"
                    onClick={() => toggleCar(index)}
                  >
                    {selectedCar === index && (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-light-blue opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-light-blue"></span>
                      </span>
                    )}
                  </div>
                  Selecionar
                </button>
              </div>
            </div>
          ))}

        {!!props.profile &&
          items?.map(({ id, model, car, color, plate }, index) => (
            <div
              key={id}
              className={clsx(
                "w-full shrink-0",
                "transform-gpu",
                memoizedPosition,
                'duration-700 ease-["cubic-bezier(0.645, 0.045, 0.355, 1.000)"]'
              )}
            >
              <div
                key={id}
                className="flex items-start justify-between md:h-48 pt-6 pl-8 h-48 bg-white my-2 rounded-lg py-6 px-8"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="">
                    <Image className="w-10 h-10" src={Car} alt="car" />
                    <div className="flex w-full h-32 items-end">
                      <div className="w-2 h-20 bg-orange"></div>
                      <div className="w-2 h-24 bg-yellow"></div>
                      <div className="w-2 h-28 bg-light-blue"></div> 
                    </div>
                  </div>
                  <div className="w-3/4 flex-col items-center justify-between space-y-4">
                    <div className="flex items-center gap-12">
                      <div className="space-y-2 text-center">
                        <div className="bg-light-blue text-white px-4 py-2 rounded-md font-semibold ">
                          Modelo
                        </div>
                        <Text
                          label={model}
                          color="gray"
                          className="uppercase"
                        />
                      </div>
                      <div className="space-y-2 text-center">
                        <div className="bg-yellow text-white px-4 py-2 rounded-md font-semibold ">
                          Cor
                        </div>
                        <Text
                          label={color}
                          color="gray"
                          className="uppercase"
                        />
                      </div>{" "}
                    </div>
                    <div className="w-full flex items-end justify-between gap-16">
                      <div className="w-20 space-y-2 text-center">
                        <div className="bg-orange text-white px-4 py-2 rounded-md font-semibold ">
                          Placa
                        </div>
                        <Text label={plate} color="gray" />
                      </div>
                      <div className="flex items-center justify-end gap-4 mb-2">
                        <Image
                          className="w-6 h-6 cursor-pointer"
                          src={Plus}
                          alt="add button car"
                          onClick={props?.add}
                        />
                        <Image
                          className="w-6 h-6 cursor-pointer"
                          src={Edit}
                          alt="edit button car"
                        />
                        <Image
                          className="w-6 h-6 cursor-pointer"
                          src={Trash}
                          alt="delete button car"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {items.length > 1 && (
        <div className="w-full flex items-center justify-center space-x-2 my-4">
          {items?.map((_, index) => (
            <button
              key={index}
              className="w-4 h-4 bg-gray rounded-full"
              onClick={() => goToIndex(index)}
              type="button"
            ></button>
          ))}
          {/* <button className="w-4 h-4 bg-gray rounded-full" onClick={prevItem}></button> */}
        </div>
      )}
    </div>
  );
};

export default Carousel;
