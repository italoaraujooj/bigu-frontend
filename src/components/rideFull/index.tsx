import { AuthContext } from "@/context/AuthContext";
import { fetchUserAddresses } from "@/services/address";
import { requestRide } from "@/services/ride";
import {
  AddressResponseDTO,
  CandidateResponseDTO,
  RequestRide,
  UserResponseDTO,
} from "@/types/types";
import { formatarData } from "@/utils/masks";
import { Clock } from "@phosphor-icons/react/dist/ssr/Clock";
import { MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";
import { Person } from "@phosphor-icons/react/dist/ssr/Person";
import Image from "next/image";
import Router from "next/router";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Star from "../../assets/star.png";
import Avatar from "../../assets/woman.png";
import Button from "../button";
import Dropdown from "../dropdown";
import Mapa from "../map";
import MapFullScreen from "../mapFullScreen";
import Modal from "../modal";
import { createOrGetChatRoom } from "@/services/chat";
import socket from "@/services/socket";

interface RideProps {
  id: string;
  driver: UserResponseDTO;
  start: AddressResponseDTO;
  destination: AddressResponseDTO;
  numSeats: number;
  model: string;
  plate: string;
  color: string;
  dateTime: string;
  toWoman: boolean;
  candidates: CandidateResponseDTO[];
}

function RideFull(props: RideProps) {
  const { user } = useContext(AuthContext);
  const [userAddress, setUserAddresses] = React.useState([]);
  const [userAddressesSelected, setUserAddressesSelected] = React.useState(
    {} as any
  );
  const [askRide, setAskRide] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [rideIdSelected, setRideIdSelected] = React.useState("");
  const [isMapFullScreen, setIsMapFullScreen] = React.useState(false); // Novo estado

  useEffect(() => {
    fetchUserAddresses().then((data) => {
      const addressesFormated = data?.data.userAddress.map(
        (address: AddressResponseDTO) => ({
          label: address.nome,
          value: address.addressId,
        })
      );
      setUserAddresses(addressesFormated);
    });
  }, [askRide]);

  const handleAskRide = (rideId: string) => {
    const userSex = user?.sex;
    if (props.driver.userId === user?.userId) {
      toast.info("Você já é o motorista dessa carona.");
      return;
    } else if (props.toWoman && userSex == "Masculino") {
      toast.info("Essa carona é exclusiva para mulheres.");
      return;
    }
    setModalOpen((prev) => !prev);
    setRideIdSelected(rideId);
  };

  const submitRide = async () => {
    try {
      const response = await requestRide({
        addressId: userAddressesSelected.value,
        rideId: rideIdSelected,
      } as RequestRide);
      if (response?.status == 200) {
        setAskRide(rideIdSelected);
        setModalOpen((prev) => !prev);
        toast.success("Solicitação enviada. Aguarde a resposta do motorista.");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const formatAddress = (adress: AddressResponseDTO) => {
    return (
      adress.rua +
      ", " +
      adress.numero +
      ", " +
      adress.cidade +
      " - " +
      adress.estado
    );
  };

  const handleViewProfile = async (userId: string) => {
    Router.push(`/view-profile/${userId}`);
  };

  const handleToggleMap = () => {
    setIsMapFullScreen((prev) => !prev);
  };

  const handleChatWithDriver = async (
    rideId: string,
    driverId: string,
    currentUserId: string
  ) => {
    if (!user) return;
    try {
      const response = await createOrGetChatRoom(
        rideId,
        currentUserId,
        driverId
      );
      const chatRoomId = response.data.chatRoomId;
      socket.emit('chatRoomCreated', { driverId, chatRoomId });
      Router.push(`/chat?chatRoomId=${chatRoomId}&participantId=${driverId}`);
    } catch (err) {
      console.error("Erro ao abrir chat:", err);
      toast.error("Erro ao abrir o chat.");
    }
  };

  if (isMapFullScreen) {
    return (
      <div className="w-full h-full fixed top-0 left-0 bg-white z-50 flex flex-col items-center justify-center">
        <Mapa
          origin={formatAddress(props.start)}
          destination={formatAddress(props.destination)}
        />
        <Button
          label="Fechar mapa"
          onClick={() => handleToggleMap()}
          size="res"
          color="red"
          shape="square"
          className="absolute top-4 right-4"
        />
      </div>
    );
  }

  return (
    <>
      {isMapFullScreen ? (
        <MapFullScreen
          origin={formatAddress(props.start)}
          destination={formatAddress(props.destination)}
          handleToggleMap={handleToggleMap}
        />
      ) : (
        <div className="bg-light-white w-full h-42 rounded-xl flex p-2 flex-col gap-4 sm:p-5">
          <div className="flex justify-between">
            <div
              onClick={() => handleViewProfile(props.driver.userId)}
              className="flex gap-2 sm:gap-4 items-center"
            >
              <Image
                className="w-8 h-8 md:w-12 md:h-12"
                src={Avatar}
                alt="foto"
              />
              <div className="flex flex-col gap-1">
                <div className="flex gap-3 items-center">
                  <h1 className="font-bold text-black font-['Poppins'] sm:text-2xl md:text-3xl">
                    {props.driver.name.split(" ")[0]}
                  </h1>
                  <Image className=" w-3 h-3" src={Star} alt="estrela" />
                  <span className=" text-gray text-xs">5.0</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between md:items-center">
            <div className="space-y-2 md:space-y-4 lg:space-y-8">
              <div className="flex gap-2 items-center">
                <MapPin size={24} color="#252525" weight="bold" />
                <span className="font-['Poppins'] font-medium text-xs sm:text-sm md:text-base lg:text-xl">
                  {props.start.bairro} - {props.destination.bairro}
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <Person size={24} color="#252525" weight="fill" />
                <span className="font-['Poppins'] font-normal text-xs sm:text-sm md:text-base lg:text-xl">
                  {props.numSeats}{" "}
                  {Number(props.numSeats) > 1
                    ? "vagas disponíveis"
                    : "vaga disponível"}
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <Clock size={24} color="#252525" weight="bold" />
                <span className="font-['Poppins'] font-medium text-xs sm:text-sm md:text-base lg:text-xl">
                  {formatarData(props.dateTime)}
                </span>
              </div>
            </div>
            <div className="flex justify-center items-start md:gap-8">
              <div className="flex flex-col h-full items-center gap-4 md:self-center">
                <Button
                  label={"Chat"}
                  onClick={() => handleChatWithDriver(props.id, props.driver.userId, (user?.userId || ''))}
                  size="xs"
                  color="green"
                  shape="square"
                  className="sm:w-36 sm:h-10 sm:px-3 md:w-48 md:h-12 md:px-8 md:text-base"
                />
                {props.candidates.some(
                  (candidate) => candidate.user.userId == user?.userId
                ) || askRide === props.id ? (
                  <span className="font-['Poppins'] animate-pulse text-yellow ease-in-out infinite text-xs">
                    Aguardando confirmação...
                  </span>
                ) : (
                  <Button
                    label="Pedir carona"
                    onClick={() => handleAskRide(props.id)}
                    size="xs"
                    color="green"
                    shape="square"
                    className="sm:w-36 sm:h-10 sm:px-3 sm:text-sm md:w-48 md:h-12 md:px-8 md:text-base"
                  />
                )}
                <span
                  className="animate-pulse text-blue-500 ease-in-out infinite font-[Poppins] cursor-pointer"
                  onClick={handleToggleMap}
                >
                  Ver no mapa
                </span>
              </div>
              <div className="hidden md:flex md:w-48 md:h-44 lg:w-80 lg:h-52">
                <Mapa
                  origin={formatAddress(props.start)}
                  destination={formatAddress(props.destination)}
                />
              </div>
            </div>
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
        </div>
      )}
    </>
  );
}

export default RideFull;
