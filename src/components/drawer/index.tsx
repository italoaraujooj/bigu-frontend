import { Jeep } from "@phosphor-icons/react/dist/ssr/Jeep";
import { SignOut } from "@phosphor-icons/react/dist/ssr/SignOut";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import clsx from "clsx";
import Text from "../text";
import { AddressResponseDTO, CarResponseDTO } from "@/types/ride";
import NextLink from "next/link";
import { toast } from "react-toastify";

type Props = {
  drawerIsOpen: boolean;
  toggleDrawer: () => void;
  handleNavigateToOfferRide: () => void;
  handleLogout: () => void;
  handleOpenRequests: () => void;
  handleOpenRides: () => void;
  userAddresses: AddressResponseDTO[];
  carsUser: CarResponseDTO[];
  showToast: () => void;
  hasCandidates: boolean
};

export default function Drawer({
  drawerIsOpen,
  toggleDrawer,
  handleNavigateToOfferRide,
  handleLogout,
  handleOpenRequests,
  handleOpenRides,
  carsUser,
  userAddresses,
  showToast,
  hasCandidates
}: Props) {
  const openRequests = () => {
    toggleDrawer();
    handleOpenRequests();
  };

  const openRides = () => {
    toggleDrawer();
    handleOpenRides();
  };

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
        onClick={showToast}
        className={clsx("w-full px-2 cursor-pointer", carsUser.length && userAddresses.length && "group")}
      >
        <div className="flex items-center gap-4">
          <Jeep size={32} color="gray" />
          <NextLink href="/offer-ride" className={clsx(!(carsUser.length && userAddresses.length) && 'pointer-events-none text-[#71717a]')}>
            <Text
              label="Oferecer Carona"
              size="xl"
              color="gray"
            />
          </NextLink>
        </div>
        <div className="w-full h-1 bg-gray mt-4 rounded-sm group-hover:bg-yellow transition ease-in-out duration-300" />
      </div>
      <div onClick={openRequests} className="w-full px-2 group cursor-pointer">
        <div className="flex items-center gap-4 relative">
          <Jeep size={32} color="gray" />
          <div className="flex">
            <Text
              label="Solicitações"
              size="xl"
              color="gray"
              className="group-hover:text-blackline"
            />
            {hasCandidates && (
              <span className="w-2 h-2 rounded-full bg-red" />
            )}
          </div>
        </div>
        <div className="w-full h-1 bg-gray mt-4 rounded-sm group-hover:bg-yellow transition ease-in-out duration-300" />
      </div>
      <div onClick={openRides} className="w-full px-2 group cursor-pointer">
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
