import React, { useEffect } from "react";
import clsx from "clsx";
import { getUserCars } from "@/services/car";
import { Actions, Attribute, Bar, Navigation } from "./components";
import Image from "next/image";
import Plus from "../../../assets/plus-green.png"

type Props = {
  profile?: boolean;
  add: any;
  needUpdate: boolean;
  toggleNeedUpdate: () => void
};

type CarProps = {
  id: string;
  model: string;
  car: string;
  color: string;
  plate: string;
};

const Carousel = (props: Props) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedCar, setSelectedCar] = React.useState(0);
  const [items, setItems] = React.useState([] as any);
  

  useEffect(() => {
    const loadData = async () => {
      getUserCars().then((response) => {
        setItems(response);
      });
    };
    loadData();
  }, []);

  useEffect(() => {
    if (props.needUpdate) {
      const loadData = async () => {
        getUserCars().then((response) => {
          setItems(response);
        });
      };
      loadData();

      props.toggleNeedUpdate();
    }
  }, [props.needUpdate])

  const toggleCar = (index: number) => {
    setSelectedCar(index);
  };

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
        {items.length > 0 ?
          items?.map(({ id, model, color, plate }: CarProps, index: number) => (
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
                  <Bar />
                  <div className="w-3/4 flex-col items-center justify-between space-y-4">
                    <div className="flex items-center gap-12">
                      <Attribute
                        label="Modelo"
                        value={model}
                        color="light-blue"
                      />
                      <Attribute label="Cor" value={color} color="yellow" />
                    </div>
                    <div className="w-full flex items-end justify-between gap-16">
                      <Attribute label="Placa" value={plate} color="orange" />
                      <Actions
                        add={props.add}
                        edit={() => {}}
                        remove={() => {}}
                        finished={props.toggleNeedUpdate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : 
        <div className="w-full bg-white flex flex-col gap-5 rounded-lg justify-center items-center mx-auto py-3 md:px-1">
          <p className="text-xs md:text-sm text-gray pt-2 font-[Poppins]">Você não possui nenhum veículo cadastrado</p>
          <Image src={Plus} alt="add" className="w-8 h-8 cursor-pointer" onClick={props.add}/>
        </div>}
      </div>
      <Navigation length={items.length} goToIndex={goToIndex} />
    </div>
  );
};

export default Carousel;
