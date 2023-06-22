import React, { useContext, useEffect } from "react";
import MaleAvatar from "../../assets/avatar.png";
import Heart from "../../assets/heart.png";
import HeartFilled from "../../assets/heart-filled.png";
import Image from "next/image";
import Button from "../button";
import Text from "../text";
import {
  createRide,
  getAllRides,
  getAllRidesAvailable,
  requestRide,
} from "@/services/ride";
import LottieAnimation from "../LottieAnimation";
import ghost from "../../assets/ghost.json";
import empty from "../../assets/empty-box.json";
import { formatarData } from "@/utils/masks";
import Modal from "../modal";
import Dropdown from "../dropdown";
import { fetchUserAddresses } from "@/services/address";
import { AuthContext } from "@/context/AuthContext";
import { RideContext } from "@/context/RideContext";
import Router from "next/router";
import clsx from "clsx";

function Ride() {
  const [userAddress, setUserAddresses] = React.useState([]);
  const [userAddressesSelected, setUserAddressesSelected] = React.useState(
    {} as any
  );
  const [favorite, setFavorite] = React.useState(false);
  const [askRide, setAskRide] = React.useState(false);
  const [ridesAvailable, setRidesAvailable] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [rideIdSelected, setRideIdSelected] = React.useState({});

  const { user } = useContext(AuthContext);
  const { rides, setRides } = useContext(RideContext);

  const toggleFavorite = () => setFavorite((prev) => !prev);
  const toggleAskRide = () => setAskRide((prev) => !prev);

  useEffect(() => {
    setRidesAvailable(rides);
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
        phoneNumber: user.phoneNumber,
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

  console.log(user);

  const rideUser = () => ridesAvailable.map((ride: any, i: number) => {
    ride.riders.map((usr: any, i: number) => {
      if (usr?.userId === user?.userId) {
        if (!i) return ride;
        ride = {...ride, confirmation: true }
      }
    })

    return ride;
  });
  console.log(rideUser());

  console.log(ridesAvailable);

  return (
    <div className="bg-dark w-[98%] h-fit rounded-lg py-6 px-6 flex flex-col mx-auto lg:mx-0 lg:w-[30rem] 2xl:w-[40rem]">
      <h2 className="font-['Poppins'] text-xl sm:text-3xl text-white font-bold pb-8">
        Caronas disponíveis
      </h2>

      <div className="space-y-4">
        {!!ridesAvailable.length ? (
          rideUser().map((item: any) => (
            <div
              key={item.id}
              className={clsx(
                "flex w-full h-16",
                "bg-white rounded-xl transition-height duration-500 ease-in-out overflow-hidden hover:h-64 sm:h-20 gap-2",
              )}
            >
              <div className={clsx("w-6 h-full", item?.toWomen && "bg-[#f15bb5]", item?.confirmation && 'bg-green')}></div>
              <div>
              <div className="flex items-center gap-2 grow px-4 py-4">
                <Image
                  className="w-8 h-8 sm:w-12 sm:h-12"
                  src={MaleAvatar}
                  alt="male avatar"
                />
                <Text
                  label={`${
                    item.driver.userId !== user?.userId
                      ? item.driver.fullName.split(" ")[0]
                      : "Você"
                  } está saindo do ${item.start.district}...`}
                  color="dark"
                  size="md"
                  className="tracking-wide text-sm md:text-md xl:text-lg "
                />
              </div>
              <div className="space-y-2 px-4">
                <p className="font-['Poppins']">
                  {`${item.car.model} ${item.car.color}`} -{" "}
                  <strong>{item.car.plate}</strong>
                </p>
                <p className="font-['Poppins']">
                  {item.numSeats}{" "}
                  {Number(item.numSeats) > 1
                    ? "vagas disponíveis"
                    : "vaga disponível"}{" "}
                </p>
                <p className="font-['Poppins']">
                  <strong>Saída às {formatarData(item.dateTime)}</strong>
                </p>
              </div>

              { item?.confirmation ? (
                <div className="w-full h-24 my-4 px-4">
                  <Text label="Carona aceita" color="green" weight="bold" size="base" className="uppercase" />
                </div>
              ) : (
                <div className={`flex items-center gap-4 px-4 py-4`}>
                {!askRide ? (
                  <Button
                    label={
                      !askRide ? "Pedir carona" : "Aguardando confirmação..."
                    }
                    onClick={() => handleAskRide(item.id)}
                    size="sm"
                    color="green"
                    shape="square"
                    className={clsx(
                      item.driver.userId === user?.userId
                        ? "font-semibold"
                        : "font-semibold",
                      !!userAddress.length && "hover:bg-hover-green"
                    )}
                    disabled={
                      item.driver.userId === user?.userId || !userAddress.length
                    }
                  />
                ) : (
                  <span className="animate-pulse text-yellow ease-in-out infinite">
                   Aguardando confirmação...
                  </span>
                )}
                <div
                  className={`flex items-center gap-2 ${
                    askRide && "translate-x-28 duration-500 ease-out"
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
              )}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex items-center justify-center">
            <div className="w-64 h-64 ">
              <LottieAnimation data={ghost} />
            </div>
          </div>
        )}
      </div>

      <footer className="pt-4">
        <p
          className=" text-gray text-base self-start hover:text-stone-400 cursor-pointer font-[Poppins]"
          onClick={() => Router.push("/availableRides")}
        >
          Ver mais
        </p>
      </footer>
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

export default Ride;
