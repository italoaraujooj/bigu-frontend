import Menu from "../assets/Menu.png"
import Foto from "../assets/woman.png"
import Star from "../assets/star.png"
import Image from "next/image"
import Ride from "@/components/ride";
import React, { useContext, useEffect } from "react";
import Button from "@/components/button";
import Back from "../assets/CaretRight.svg"
import RideFull from "@/components/rideFull";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import History from "@/components/history";
import Router from "next/router"
import { getToken } from "@/utils/cookies";
import { GetServerSideProps } from "next";
import { getUser } from "@/services/auth";
import { hasCookie } from "cookies-next";
import { parseCookies } from "nookies";

function Dashboard({ cars }: any){
  
  const { user, logOu } = useContext(AuthContext);
  console.log('page');
  console.log(user);
  const [drawer, setDrawer] = React.useState(false);

  const openDrawer = () => {
    setDrawer(true);
  };

  const handleOutsideClick = (event: any) => {
    // Verifica se o clique ocorreu fora do drawer
    if (drawer && !event.target.closest('#drawer')) {
      setDrawer(false);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('chamou')
      await logOu();
    } catch (err) {
      console.log(err);
    }
  }

  return (
      <div className=" relative w-full py-9" onClick={handleOutsideClick}>
        <div className=" max-w-[89%] mx-auto flex flex-col gap-9">
          <header className="flex justify-between items-center px-6">
            <div className="flex gap-2 items-center">
              <Image className=" w-10 h-10" src={Foto} alt="foto" />
              <Link href="/profile" className="text-gray">Ver perfil</Link>
            </div>
            <Image className=" w-9 h-6 md:hidden" src={Menu} alt="menu" onClick={openDrawer}/>
            <div className="hidden md:flex md:gap-5">
              <Link href="/offer-ride" className="text-gray"><Button label="Oferecer carona" onClick={() => {}} size="md" color="green" shape="square" /></Link>
              <Button label="Sair" onClick={handleLogout} size="md" color="green" shape="square" />
            </div>
            {drawer && 
              <div id="drawer" className="bg-white w-1/2 fixed top-0 right-0 h-44 rounded flex justify-center items-center">
                <div className="flex flex-col p-5 justify-center items-center gap-5 ">
                  <Button label="Oferecer carona" onClick={() => {}} size="res" color="yellow" shape="square" />
                  <Button label="Sair" onClick={handleLogout} size="res" color="yellow" shape="square" />
                </div>
              </div>
            }
          </header>
          <div className="flex justify-between items-center px-6">
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
          <div className="flex justify-between">
            <Ride/>
              <div className=" h-96 border-r border-solid border-warmGray-700"></div>
            <History/>
          </div>
        </div>
      </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'nextauth.token': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // const isAuthenticated = getToken();// Lógica para verificar autenticação
  // if (!hasCookie("token")) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  //   const data = await getUser();
  //   console.log(data);
  // } catch (err) {
  //   console.log(err);
  // }

  // const cars = await fetchUserCars();
  // const addresses = await fetchUserAddresses();

  return {
    props: {
      // cars: [],
      // addresses: [],
    },
  };
}

export default Dashboard;