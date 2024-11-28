import { useState, useEffect } from "react";
import { Text } from "@/components";
import Image from "next/image";
import Elas from "../../assets/elas.png";
import Car from "../../assets/car.png";
import CarSecondary from "../../assets/sport-car.png";

const RotatingBanner = () => {
  const items = [
    {
      image: Elas,
      text: "Aqui nós temos caronas, de mulheres, só para mulheres!",
    },
    {
      image: Car,
      text: "Você pode ter o seu anúncio aqui! Entre em contato.",
    },
    {
      image: CarSecondary,
      text: "Cadastre-se agora e comece a pegar caronas hoje!",
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
    <div className="relative w-full h-48 overflow-hidden rounded-lg shadow-lg bg-yellow">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute w-full h-full flex items-center justify-center text-white transition-transform duration-500 ease-in-out ${
            index === currentIndex ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
          }`}
        >
          <div className="w-full h-full flex flex-row items-center justify-center text-center px-4 space-x-4">
            {/* Imagem */}
            <Image
              className="w-64 h-auto object-contain rounded-md"
              src={item.image}
              alt={`Banner ${index + 1}`}
            />
            {/* Texto */}
            <Text
              label={item.text}
              size="lg"
              weight="bold"
              className="leading-[3rem] md:text-4xl xl:text-5xl"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RotatingBanner;
