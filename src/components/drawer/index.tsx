import React, { useContext } from "react";
import Text from "../text";
import clsx from "clsx";
import useDrawer from "@/hooks/useDrawer";
import { Jeep, SignOut, X } from "@phosphor-icons/react";
import { AuthContext } from "@/context/AuthContext";

type Props = {
  drawerIsOpen: boolean;
  toggleDrawer: () => void;
  handleNavigateToOfferRide: () => void;
  handleLogout: () => void;
  handleOpenRequests: () => void;
  handleOpenRides: () => void;
};

export default function Drawer({
  drawerIsOpen,
  toggleDrawer,
  handleNavigateToOfferRide,
  handleLogout,
  handleOpenRequests,
  handleOpenRides
}: Props) {

  const openRequests = () => {
    toggleDrawer();
    handleOpenRequests();
  }

  const openRides= () => {
    toggleDrawer();
    handleOpenRides();
  }

  return (
    <div
      id="drawer"
      className={clsx(
        "bg-white w-full h-full fixed top-0 right-0 py-14 px-14 space-y-4 transition-all ease-in-out duration-500 z-50",
        drawerIsOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <X
        size={32}
        onClick={toggleDrawer}
        className="cursor-pointer"
        color="dark"
      />
      <br />
      <div
        onClick={handleNavigateToOfferRide}
        className="w-full px-2 group cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <Jeep size={32} color="gray" />
          <Text
            label="Oferecer Carona"
            size="xl"
            color="gray"
            className="group-hover:text-blackline"
          />
        </div>
        <div className="w-full h-1 bg-gray mt-4 rounded-sm group-hover:bg-yellow transition ease-in-out duration-300" />
      </div>
      <div
        onClick={openRequests}
        className="w-full px-2 group cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <Jeep size={32} color="gray" />
          <Text
            label="Solicitações"
            size="xl"
            color="gray"
            className="group-hover:text-blackline"
          />
        </div>
        <div className="w-full h-1 bg-gray mt-4 rounded-sm group-hover:bg-yellow transition ease-in-out duration-300" />
      </div>
      <div
        onClick={openRides}
        className="w-full px-2 group cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <Jeep size={32} color="gray" />
          <Text
            label="Minhas corridas"
            size="xl"
            color="gray"
            className="group-hover:text-blackline"
          />
        </div>
        <div className="w-full h-1 bg-gray mt-4 rounded-sm group-hover:bg-yellow transition ease-in-out duration-300" />
      </div>
      <div
        className="w-full px-2 flex items-end gap-4 justify-end cursor-pointer"
        onClick={handleLogout}
      >
        <SignOut size={32} color="gray" />
        <Text label="Sair" size="xl" color="gray" />
      </div>
    </div>
  );
}
