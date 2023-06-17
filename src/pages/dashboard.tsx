import Menu from "../assets/Menu.png";
import Foto from "../assets/woman.png";
import Star from "../assets/star.png";
import Image from "next/image";
import Ride from "@/components/ride";
import React, { useContext, useEffect } from "react";
import Button from "@/components/button";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import History from "@/components/history";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Text from "@/components/text";
import { RideContext } from "@/context/RideContext";
import { SignOut } from "@phosphor-icons/react";
import { Car, getUserCars } from "@/services/car";
import { X } from "@phosphor-icons/react";
import clsx from "clsx";
import Router from "next/router";
import Drawer from "@/components/drawer";
import useDrawer from "@/hooks/useDrawer";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { history } = useContext(RideContext);
  const {
    drawerIsOpen,
    toggleDrawer,
    handleLogout,
    handleNavigateToOfferRide,
  } = useDrawer();

  const [drawer, setDrawer] = React.useState(false);
  const [cars, setCars] = React.useState<Car[]>([]);

  const handleOutsideClick = (event: any) => {
    if (drawer && !event.target.closest("#drawer")) {
      setDrawer(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      getUserCars().then((response) => {
        setCars(response);
      });
    };

    loadData();
  }, []);

  return (
    <div className="relative w-full my-16" onClick={handleOutsideClick}>
      <div className=" max-w-[80%] mx-auto flex flex-col gap-9">
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
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <h1 className="text-xl font-bold text-white md:text-4xl mr-2">
                {`Olá, ${user?.fullName}`}
              </h1>
              <div className="flex items-center gap-2 pt-2">
                <Image className="w-3 h-3" src={Star} alt="estrela" />
                <span className="text-gray text-[0.725rem]">5.0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 sm:gap-12 lg:gap-12 lg:flex-row">
          <History races={history} />
          <div className="border-solid border-[1px] border-warmGray-700"></div>
          <Ride />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "nextauth.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;
