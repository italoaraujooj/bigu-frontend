import { useContext, useEffect, useState } from "react";
import Modal from "../modal";
import Avatar from "../../assets/woman.png"
import Image from "next/image";
import Text from "../text";
import Star from "../../assets/star.png"
import Button from "../button";
import Fav from "../../assets/heart.png"
import Plus from "../../assets/PlusCircle.png"
import Map from "../../assets/map.png"
import X from "../../assets/X.png"
import { formatDateRide, formatarData } from "@/utils/masks";
import { data } from "autoprefixer";
import { MapPin, Person, Clock } from "@phosphor-icons/react";
import React from "react";
import { AuthContext } from "@/context/AuthContext";
import { RideContext } from "@/context/RideContext";
import { fetchUserAddresses } from "@/services/address";
import { requestRide } from "@/services/ride";
import Heart from "../../assets/heart.png";
import HeartFilled from "../../assets/heart-filled.png";
import Dropdown from "../dropdown";

interface RideProps {
  id:any,
  userName: string,
  start: string,
  destination: string,
  numSeats: number,
  model: string,
  plate: string,
  color: string,
  dateTime: string,
}

function RideFull(props: RideProps) {
  const [userAddress, setUserAddresses] = React.useState([]);
  const [userAddressesSelected, setUserAddressesSelected] = React.useState(
    {} as any
  );
  const [favorite, setFavorite] = React.useState(false);
  const [askRide, setAskRide] = React.useState(false);
  const [ridesAvailable, setRidesAvailable] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [rideIdSelected, setRideIdSelected] = React.useState({});

  const { rides } = useContext(RideContext);
  const [showModal, setShowModal] = useState(false);

  const toggleFavorite = () => setFavorite((prev) => !prev);
  const toggleAskRide = () => setAskRide((prev) => !prev);
  
  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  useEffect(() => {
    console.log(rides)
    setRidesAvailable(rides)
  }, [rides]);  

  useEffect(() => {
    fetchUserAddresses().then((data) => {
      const addressesFormated = data?.data.map((address: any) => ({
        label: address.nickname,
        value: address.id,
      }));
      setUserAddresses(addressesFormated);
    });
  }, [askRide]);

  const handleAskRide = (rideId: number) => {
    setModalOpen((prev) => !prev);
    setRideIdSelected(rideId);
  };

  const submitRide = async () => {
    try {
      const response = await requestRide({
        addressId: Number(userAddressesSelected.value),
        rideId: Number(rideIdSelected),
      });
      if (response?.status == 200) {
        setAskRide((prev) => !prev);
        setModalOpen((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className="bg-light-white w-full h-48 rounded-xl flex p-2 flex-col gap-4 sm:p-5 md:h-56 md:gap-0 md:p-3">
      <div className="flex justify-between py-4 px-6">
        <div className="flex gap-2 sm:gap-4 items-center">
          <Image className="w-8 h-8 md:w-12 md:h-12" src={Avatar} alt="foto" />
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex gap-3 items-center">
              <h1 className="font-bold text-2xl text-black font-['Poppins'] sm:text-xl md:text-3xl">
                {props.userName.split(" ")[0]}
              </h1>
              <Image className=" w-3 h-3" src={Star} alt="estrela" />
              <span className=" text-gray text-xs">5.0</span>
            </div>
            {/* <div className="flex gap-2 md:gap-4">
              <Image src={Car} alt="carro" />
              <span className="text-xs md:text-base">
                {props.model} - <strong>Placa {props.plate}</strong>
              </span>
            </div> */}
          </div>
        </div>
        {/* <div onClick={handleOpen}>
          <Image className=" w-5 h-5 md:w-7 md:h-7" src={Plus} alt="plus" />
        </div> */}
      </div>

      <div className="flex justify-between md:items-center px-6">
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <MapPin size={24} color="#252525" weight="bold"/>
            <span className="font-['Poppins'] font-medium text-[10px] sm:text-sm md:text-base">
              {props.start} - {props.destination}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <Person size={24} color="#252525" weight="fill"/>
            <span className="font-['Poppins'] font-normal text-[10px] sm:text-sm md:text-base">
              {props.numSeats}{" "}
              {Number(props.numSeats) > 1
                ? "vagas disponíveis"
                : "vaga disponível"}{" "}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <Clock size={24} color="#252525" weight="bold" />


            <span className="font-['Poppins'] font-medium text-[10px] sm:text-sm md:text-base">
              {formatDateRide(props.dateTime)}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-1 items-center justify-center w">
            {!askRide ? (
              <Button
                label={
                  !askRide
                    ? "Pedir carona"
                    : "Aguardando confirmação..."
                }
                onClick={() => handleAskRide(props.id)}
                size="sm"
                color="green"
                shape="square"
                className={`font-semibold hover:bg-hover-green`}
              />
            ) : (
              <span className="animate-pulse text-yellow ease-in-out infinite">
                Aguardando confirmação..
              </span>
            )}
            <div
              className={`flex items-center gap-2 ${askRide && "translate-x-44 duration-500 ease-out"
                }`}
            >
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
              {!askRide && (
                <p className="font-['Poppins'] text-sm font-normal">
                  Adicionar aos favoritos
                </p>
              )}
            </div>
          </div>

          <Image className="hidden md:block md:w-40 md:h-32 md:relative bottom-8" src={Map} alt="mapa" />
        </div>

        {/* <Image className="hidden lg:block md:w-40 md:h-32 md:relative bottom-8" src={Map} alt="mapa" /> */}
      </div>
      <Modal isOpen={showModal} onClose={handleClose}>
        <div className="w-3/4 bg-white h-2/4 relative rounded-lg p-2 sm:2/4">
          {/* <Image className=" absolute top-2 right-2 cursor-pointer" src={X} alt="sair" onClick={handleClose}/> */}
          {/* dasdfdfdssdf */}
        </div>
      </Modal>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen((prev) => !prev)}
        onSubmit={submitRide}
      >
        <Dropdown
          label="Selecione o ponto de partida"
          options={userAddress}
          onSelectOption={setUserAddressesSelected}
        />
      </Modal>
      
    </div>

  );
}

export default RideFull;