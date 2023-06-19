import Menu from "../../assets/Menu.png";
import Foto from "../../assets/woman.png";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import Button from "../button";
import Text from "../text";
import { List, SignOut } from "@phosphor-icons/react";
import Drawer from "../drawer";
import useDrawer from "@/hooks/useDrawer";
import { RideContext } from "@/context/RideContext";

type Props = {
  handleOpenRequests: () => void;
}

export default function Header( props: Props ) {
  const {
    drawerIsOpen,
    toggleDrawer,
    handleLogout,
    handleNavigateToOfferRide,
  } = useDrawer();

  const { cars } = useContext(RideContext);
  const [carsUser, setCarsUser] = useState([] as any)

  useEffect(() => {
    setCarsUser(cars);
  }, [cars]);

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
      <List size={32} color="gray" className="md:hidden cursor-pointer" onClick={toggleDrawer}/>

      <div className="hidden md:flex md:gap-5">
        <Link href="/offer-ride" className="text-gray">
          <Button
            label="Oferecer carona"
            size="base"
            color="green"
            className="uppercase"
            shape="square"
            disabled={carsUser.length === 0}
          />
        </Link>
        <Button
          label="Solicitações de carona"
          size="base"
          color="green"
          className="uppercase"
          shape="square"
          onClick={props.handleOpenRequests}
        />
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
