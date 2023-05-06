import React from "react";
import Car from "../../../assets/car.png";
import CarSecondary from "../../../assets/car-secondary.png";
import clsx from "clsx";
import Image from "next/image";
import Text from "../../text";

type Props = {};

interface CarsGarageProps {
  id: number;
  model: string;
  car: typeof Car;
}

const Carousel = (props: Props) => {
  const items = [
    {
      id: 1,
      model: "COROLLA PRATA",
      car: Car,
    },
    {
      id: 2,
      model: "GOLF BRANCO",
      car: CarSecondary,
    },
  ] as CarsGarageProps[];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedCar, setSelectedCar] = React.useState(1);
  const [porcentage, setPorcentage] = React.useState(0);
  const [vacancies, setVacancies] = React.useState(0);

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
        className: "translate-x-[-110.5%]",
      },
    ];
    return positions[currentIndex].className;
  }, [currentIndex]);

  return (
    <div className="w-71rem">
      <div
        onMouseLeave={() => goToIndex(selectedCar)}
        className={`w-full flex items-center overflow-hidden space-x-12`}
      >
        {!!items &&
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
                <Image className="w-12 h-12" src={car} alt="car" />
                <Text label={model} size="md" color="gray" weight="medium" />
                <button className="h-12 font-family bg-green rounded-lg text-white font-semibold text-base px-6 flex items-center justify-between gap-6 uppercase tracking-tight hover:bg-hover-green">
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
      </div>
      <div className="w-full flex items-center justify-center space-x-2 my-4">
        {items?.map((_, index) => (
          <button
            key={index}
            className="w-4 h-4 bg-gray rounded-full"
            onClick={() => goToIndex(index)}
          ></button>
        ))}
        {/* <button className="w-4 h-4 bg-gray rounded-full" onClick={prevItem}></button> */}
      </div>
    </div>
  );
};

export default Carousel;
