import Menu from "../../assets/Menu.png";
import Foto from "../../assets/woman.png";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import Button from "../button";
import Text from "../text";
import { List, SignOut } from "@phosphor-icons/react";
import Drawer from "../drawer";
import useDrawer from "../../hooks/useDrawer";
import { RideContext } from "../../context/RideContext";
import Link from "./Link";
import clsx from "clsx";

type Props = {
  handleOpenRequests: () => void;
  handleOpenRides: () => void;
};

export default function Header(props: Props) {
  const {
    drawerIsOpen,
    toggleDrawer,
    handleLogout,
    handleNavigateToOfferRide,
  } = useDrawer();

  const { cars, userAddress: address } = useContext(RideContext);
  const [carsUser, setCarsUser] = useState([] as any);
  const [addressUser, setAddressUser] = useState([] as any);

  useEffect(() => {
    setAddressUser(address);
    setCarsUser(cars);
  }, [cars, address]);

  return (
    <header className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image className="w-12 h-12" src={Foto} alt="foto" />
        <Link
          to="/profile"
          label="Ver perfil"
          className="hover:text-stone-400 text-xl"
        />
      </div>
      <List
        size={32}
        color="gray"
        className="lg:hidden cursor-pointer"
        onClick={toggleDrawer}
      />

      <div className="hidden lg:flex md:gap-5 items-center">
        <button className="group transition-all duration-300 ease-in-out">
          <Link
            to="/offer-ride"
            className={clsx("text-gray text-base uppercase font-medium", (!!carsUser.length) && 'hover:text-[#a8a29e] py-2 text-gray text-base hover:text-[#a8a29e] uppercase font-medium bg-left-bottom bg-gradient-to-r from-amber-400 to-amber-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out underline-offset-8')}
            label="Oferecer carona"
            disabled={!carsUser.length}
          />
        </button>
        <button onClick={props.handleOpenRequests} className="group transition-all duration-300 ease-in-out">
          <Text
            label="Solicitações de carona"
            className="py-2 text-gray text-base hover:text-[#a8a29e] uppercase font-medium bg-left-bottom bg-gradient-to-r from-amber-400 to-amber-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out underline-offset-8"
            color="gray"
            size="base"
            weight="medium"
          />
        </button>

        <button onClick={props.handleOpenRides} className="group transition-all duration-300 ease-in-out">
          <Text
            label="Caronas oferecidas"
            className="py-2 text-gray hover:text-[#a8a29e] text-base uppercase font-medium bg-left-bottom bg-gradient-to-r from-amber-400 to-amber-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out underline-offset-8"
            color="gray"
            size="base"
            weight="medium"
          />
        </button>
        <span
          className="flex items-center gap-2 hover:text-stone-400 cursor-pointer hover:underline"
          onClick={handleLogout}
        >
          <Text
            label="SAIR"
            size="md"
            color="gray"
            className="cursor-pointer hover:hover:text-stone-400"
          />
          <SignOut size={36} color="gray" className="" />
        </span>
      </div>
      <Drawer
        drawerIsOpen={drawerIsOpen}
        toggleDrawer={toggleDrawer}
        handleNavigateToOfferRide={handleNavigateToOfferRide}
        handleLogout={handleLogout}
      />
    </header>
  );
}
