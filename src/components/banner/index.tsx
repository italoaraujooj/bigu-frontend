import { useState, useEffect } from "react";
import { Text } from "@/components";
import Image from "next/image";
import Elas from "../../assets/womens.png";
import Car from "../../assets/car.png";
import SportCar from "../../assets/sport-car.png";

const RotatingBanner = () => {
  const items = [
    {
      image: Elas,
      text: "Aqui nós temos caronas, de mulheres, só para mulheres!",
      style: "w-36 h-auto sm:w-60 md:w-80 object-contain rounded-md",
    },
    {
      image: Car,
      text: "Você pode ter o seu anúncio aqui! Entre em contato.",
      style: "w-24 h-auto sm:w-48 md:w-64 object-contain rounded-md",
    },
    {
      image: SportCar,
      text: "Cadastre-se agora e comece a pegar caronas hoje!",
      style: "w-24 h-auto sm:w-48 md:w-64 object-contain rounded-md",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 4000); // Troca a cada 4 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
  }, [items.length]);

  return (
    <div className="relative w-full h-32 sm:h-48 md:h-52 lg:h-60 xl:h-52 overflow-hidden rounded-lg shadow-lg bg-yellow">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute w-full h-full flex items-center justify-center text-white transition-transform duration-500 ease-in-out ${
            index === currentIndex
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full"
          }`}
        >
          <div className="w-full h-full flex flex-row items-center justify-center text-center px-4 space-x-4">
            {/* Imagem */}
            <Image
              className={item.style}
              src={item.image}
              alt={`Banner ${index + 1}`}
            />
            {/* Texto */}
            <Text
              label={item.text}
              size="lg"
              weight="bold"
              // className="leading-[3rem] md:text-4xl xl:text-5xl"
              className="leading-6 sm:leading-8 md:leading-[3rem] text-lg sm:text-2xl md:text-5xl"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RotatingBanner;
