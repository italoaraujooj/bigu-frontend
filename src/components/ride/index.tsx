import React from "react";
import MaleAvatar from "../../assets/avatar.png";
import Heart from "../../assets/heart.png";
import HeartFilled from "../../assets/heart-filled.png";
import Image from "next/image";
import Button from "../button";

function Ride() {
  const [favorite, setFavorite] = React.useState(false);
  const [askRide, setAskRide] = React.useState(false);

  const toggleFavorite = () => setFavorite((prev) => !prev);
  const toggleAskRide = () => setAskRide((prev) => !prev);

  return (
    <div className="bg-dark w-[98%] h-fit rounded-lg py-6 px-9 flex flex-col items-center mx-auto lg:mx-0 lg:w-[30rem]">
      <h2 className="font-['Poppins'] text-2xl sm:text-3xl text-white font-bold pb-8">
        Caronas disponíveis
      </h2>

      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="w-full h-14 bg-white rounded-xl px-6 py-4 transition-height duration-500 ease-in-out overflow-hidden	space-y-4 hover:h-64 sm:h-20"
          >
            <div className="flex items-center gap-2">
              <Image className="w-8 h-8 sm:w-12 sm:h-12" src={MaleAvatar} alt="male avatar" />
              <p className="font-['Poppins'] font-light text-xs sm:text-xl">
                Carlos está saindo do Alto Branco...
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-['Poppins']">
                Corolla Prata - <strong>Placa X8X1543</strong>
              </p>
              <p className="font-['Poppins']">3 vagas disponíveis</p>
              <p className="font-['Poppins']">
                <strong>Saída às 7 horas</strong>
              </p>
            </div>

            <div className={`flex items-center gap-4`}>
              {!askRide ? (
                <Button
                  label={
                    !askRide ? "Pedir carona" : "Aguardando confirmação..."
                  }
                  onClick={toggleAskRide}
                  size="sm"
                  color="green"
                  shape="square"
                  className={`font-semibold hover:bg-hover-green`}
                />
              ) : (
                <span className="animate-pulse text-yellow ease-in-out infinite">Aguardando confirmação..</span>
              )}
              <div className={`flex items-center gap-2 ${askRide && 'translate-x-44 duration-500 ease-out'}`}>
                <button onClick={toggleFavorite}>
                  {!favorite ? (
                    <Image className="w-6 h-6" src={Heart} alt="heart" />
                  ) : (
                    <Image
                      className="w-6 h-6 transition-transform scale-110"
                      src={HeartFilled}
                      alt="heart"
                    />
                  )}
                </button>
                { !askRide && <p className="font-['Poppins'] text-sm font-normal">
                  Adicionar aos favoritos
                </p> }
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="pt-4">
        <p className="flex text-gray">Ver mais</p>
      </footer>
    </div>
  );
}

export default Ride;
