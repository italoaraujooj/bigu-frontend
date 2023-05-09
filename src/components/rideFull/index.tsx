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

function RideFull(){
  const [showModal, setShowModal] = useState(false);
  
  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

    
  return (
    <div>
      <div className="bg-light-white w-[20.625rem] h-44 rounded-xl p-2 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Image className=" w-12 h-12" src={Avatar} alt="foto" />
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex gap-3 items-center">
                <h1 className="font-bold text-2xl text-black font-['Poppins']">
                  Carlos
                </h1>
                <Image className=" w-5 h-5" src={Star} alt="estrela" />
                <span className=" text-gray text-xs">5.0</span>
              </div>
              <div className="flex gap-2">
                <Image src={Car} alt="carro" />
                <span className=" text-xs">
                  Corolla Prata - <strong>Placa X8X1543</strong>
                </span>
              </div>
            </div>
          </div>
          <div onClick={handleOpen}>
            <Image className=" w-5 h-5" src={Plus} alt="plus" />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Image className=" w-4 h-4" src={Origin} alt="origem" />
              <span className="font-['Poppins'] font-normal text-xs">
                Alto Branco - UFCG
              </span>
            </div>

            <div className="flex gap-2">
              <Image className=" w-4 h-4" src={Person} alt="pessoa" />
              <span className="font-['Poppins'] font-normal text-xs">
                3 Vagas disponíveis
              </span>
            </div>

            <div className="flex gap-2">
              <Image className=" w-4 h-4" src={Clock} alt="relogio" />
              <span className="font-['Poppins'] font-normal text-xs">
                Saída às 7 horas
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 items-center justify-center">
            <Button
              label="Pedir carona"
              onClick={() => {}}
              size="res"
              color="green"
              shape="square"
              className="text-black"
            />
            <div className="flex gap-2">
              <Image className=" w-5 h-5" src={Fav} alt="coracao" />
              <span className="font-['Poppins'] font-normal text-xs">
                Adicionar aos favoritos
              </span>
            </div>
          </div>
        </div>
      </div>
      {showModal && 
        <Modal show={showModal} handleClose={handleClose}>
          <div>
            <Button label="Sair do Modal" size="lg" color="yellow" onClick={handleClose}/>
          </div>
        </Modal>
      }
    </div>
  );
}

export default RideFull;