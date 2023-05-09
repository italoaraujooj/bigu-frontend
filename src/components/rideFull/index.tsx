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

function RideFull(){
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

    
  return (
    <div className="bg-light-white w-[20.625rem] h-44 rounded-xl p-2">
      <div className="flex gap-2 items-center">
        <Image className=" w-12 h-12" src={Avatar} alt="foto" />
        <div className="flex flex-col">
          <div className="flex gap-3 items-center">
            <h1 className="font-bold text-2xl text-black font-['Poppins']">Carlos</h1>
            <Image className=" w-5 h-5" src={Star} alt="estrela"/>
            <span className=" text-gray text-base">5.0</span>
          </div>
          <div className="flex gap-2">
            <Image src={Car} alt="carro"/>
            <span className=" text-xs">Corolla Prata - <strong>Placa X8X1543</strong></span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 mt-6">
            <Image className=" w-4 h-4" src={Origin} alt="origem"/>
            <span className=" font-normal text-sm">Alto Branco - UFCG</span>
          </div>
          
          <div className="flex gap-2">
            <Image className=" w-4 h-4" src={Person} alt="pessoa"/>
            <span className=" font-normal text-sm">3 Vagas disponíveis</span>
          </div>
          
          <div className="flex gap-2">
            <Image className=" w-4 h-4" src={Clock} alt="relogio"/>
            <span className=" font-normal text-sm">Saída às 7 horas</span>
          </div>

        </div>
        
        <div>

        </div>
      </div>
    </div>

  );
}

export default RideFull;