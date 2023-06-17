import Menu from "../../assets/Menu.png";
import Foto from "../../assets/woman.png";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import Button from "../button";
import Text from "../text";
import { SignOut } from "@phosphor-icons/react";
import Drawer from "../drawer";
import useDrawer from "@/hooks/useDrawer";
import { RideContext } from "@/context/RideContext";

type Props = {};

export default function Header({}: Props) {
  const {
    drawerIsOpen,
    toggleDrawer,
    handleLogout,
    handleNavigateToOfferRide,
  } = useDrawer();
  const { cars } = useContext(RideContext);

  return (
    <header className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image className="w-12 h-12" src={Foto} alt="foto" />
        <Link href="/profile">
          <Text
            label="Ver perfil"
            color="gray"
            size="xl"
            className="hover:text-stone-400"
          />
        </Link>
      </div>
      <Image
        className=" w-9 h-6 md:hidden cursor-pointer"
        src={Menu}
        alt="menu"
        onClick={toggleDrawer}
      />
      <div className="hidden md:flex md:gap-5">
        <Link href="/offer-ride" className="text-gray">
          <Button
            label="Oferecer carona"
            size="base"
            color="green"
            className="uppercase"
            shape="square"
            disabled={!cars.length}
          />
        </Link>
        <span
          className="flex items-center gap-2 hover:text-stone-400 cursor-pointer hover:underline"
          onClick={handleLogout}
        >
          <Text
            label="Sair"
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
