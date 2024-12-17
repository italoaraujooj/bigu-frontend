import Image from "next/image";
import React, { useEffect } from "react";
import Plus from "../../../assets/plus.png";
import Minus from "../../../assets/minus.png";
import clsx from "clsx";

type Props = {
  vacancies: number;
  setVacancies: React.Dispatch<React.SetStateAction<number>>;
  range: string | undefined
};

const NumericField = (props: Props) => {
  const { vacancies, setVacancies, range } = props;

  useEffect(() => {
    if(range === "MOTORCYCLE"){
      setVacancies(0)
    }
  },[range])

  const vacanciesUp = () =>
    setVacancies((prev) => {
      if (prev < 2) {
        return prev + 1;
      }

      return prev;
    });
  const vacanciesDown = () =>
    setVacancies((prev) => {
      if (prev > 0) {
        return prev - 1;
      }

      return prev;
    });

  const memoizedPosition = React.useMemo(() => {
    // Cálculo baseado em `position`
    const positions = [
      {
        className: "top-[1rem]",
      },
      {
        className: "top-[-1.5rem]",
      },
      {
        className: "top-[-4rem]",
      },
    ];

    // Limit the vacancies to the range of available positions
    const index = Math.min(vacancies, positions.length - 1);

    return positions[index].className;
  }, [vacancies]);

  return (
    <>
      <label className="font-['Poppins'] text-[#616161] font-bold text-xs md:text-md uppercase mb-2">
        VAGAS DISPONÍVEIS
      </label>
      <div className="relative w-full h-14 px-5 text-sm bg-extralight rounded-lg flex items-center justify-center overflow-hidden">
        <button
          onClick={vacanciesDown}
          className="w-full h-full cursor-pointer"
          type="button"
          disabled={range === "MOTORCYCLE"}
        >
          <Image
            className="absolute inset-y-3 right-0 w-8 h-8 left-6 cursor-pointer"
            src={Minus}
            alt="minus icon"
          />
        </button>
        {
          range === "MOTORCYCLE"
          ?
          <p className="text-base text-gray absolute">
              1
          </p>
          :
          <div
            className={clsx(
              `absolute space-y-4`,
              memoizedPosition,
              "duration-500",
              "ease-in-out"
            )}
          >
            {[1, 2, 3].map((item) => (
              <p key={item} className="text-base text-gray">
                {item}
              </p>
            ))}
          </div>
        }
        <button onClick={vacanciesUp} type="button" disabled={range === "MOTORCYCLE"}>
          <Image
            className="absolute inset-y-3 w-8 h-8 right-6 cursor-pointer "
            src={Plus}
            alt="plus icon"
          />
        </button>
      </div>
    </>
  );
};

export default NumericField;
