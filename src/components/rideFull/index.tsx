import { useState } from "react";
import Modal from "../modal";
import Avatar from "../../assets/woman.png"
import Image from "next/image";
import Text from "../text";
import Star from "../../assets/star.png"
import Car from "../../assets/car-small.png"
import Clock from "../../assets/Horario.png"
import Origin from "../../assets/origin.png"
import Person from "../../assets/person.png"
import Button from "../button";
import Fav from "../../assets/heart.png"
import Plus from "../../assets/PlusCircle.png"
import Map from "../../assets/map.png"
import X from "../../assets/X.png"

interface RideProps {
  userName: string,
  start: string,
  destination: string,
  numSeats: number,
  model: string,
  plate: string,
  color: string
}

function RideFull(props: RideProps) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  return (

    <div className="bg-light-white w-full h-44 rounded-xl flex p-2 flex-col gap-4 sm:p-5 sm:gap-2 md:w-[40rem] md:h-56 md:gap-0 md:p-3">
      <div className="flex justify-between">
        <div className="flex gap-2 sm:gap-4">
          <Image className=" w-12 h-12" src={Avatar} alt="foto" />
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex gap-3 items-center">
              <h1 className="font-bold text-2xl text-black font-['Poppins'] md:text-3xl">
                {props.userName.split(" ")[0]}
              </h1>
              <Image className=" w-5 h-5" src={Star} alt="estrela" />
              <span className=" text-gray text-xs">5.0</span>
            </div>
            <div className="flex gap-2 md:gap-4">
              <Image src={Car} alt="carro" />
              <span className="text-xs md:text-base">
                {props.model} - <strong>Placa {props.plate}</strong>
              </span>
            </div>
          </div>
        </div>
        <div onClick={handleOpen}>
          <Image className=" w-5 h-5 md:w-7 md:h-7" src={Plus} alt="plus" />
        </div>
      </div>

      <div className="flex justify-between md:items-center">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Image className=" w-4 h-4 md:w-6 md:h-6" src={Origin} alt="origem" />
            <span className="font-['Poppins'] font-normal text-[10px] sm:text-sm md:text-base">
              {props.start} - {props.destination}
            </span>
          </div>

          <div className="flex gap-2">
            <Image className="w-4 h-4 md:w-6 md:h-6" src={Person} alt="pessoa" />
            <span className="font-['Poppins'] font-normal text-[10px] sm:text-sm md:text-base">
              {props.numSeats} Vagas disponíveis
            </span>
          </div>

          <div className="flex gap-2">
            <Image className=" w-4 h-4 md:w-6 md:h-6" src={Clock} alt="relogio" />
            <span className="font-['Poppins'] font-normal text-[10px] sm:text-sm md:text-base">
              Saída às 7 horas
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-center justify-center w">
          <Button
            label="Pedir carona"
            onClick={() => { }}
            size="res"
            color="green"
            shape="square"
            className="text-black md:w-48 md:px-8 md:h-14 md:text-lg"
          />
          <div className="flex gap-2">
            <Image className=" w-5 h-5" src={Fav} alt="coracao" />
            <span className="font-['Poppins'] font-normal text-[10px]">
              Adicionar aos favoritos
            </span>
          </div>
        </div>

        <Image className="hidden md:block md:w-40 md:h-32 md:relative bottom-8" src={Map} alt="mapa" />
      </div>
      <Modal isOpen={showModal} onClose={handleClose}>
        <div className="w-3/4 bg-white h-2/4 relative rounded-lg p-2 sm:2/4">
          {/* <Image className=" absolute top-2 right-2 cursor-pointer" src={X} alt="sair" onClick={handleClose}/> */}
          dasdfdfdssdf
        </div>
      </Modal>
      
    </div>

  );
}

export default RideFull;