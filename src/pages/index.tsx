import { Inter } from "next/font/google";
import Text from "@/components/text";
import Button from "@/components/button";
import RideFull from "@/components/rideFull";
import Register from "@/components/register/register";
import Login from "@/components/login/login";
import Image from "next/image";
import Logo from "../assets/car-secondary.png";
import Menu from "../assets/Menu.png";
import { useState } from "react";
import LottieAnimation from "@/components/LottieAnimation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleOpenLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleOpenRegister = () => {
    setShowRegister(true);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  return (
    <div
      // className=""
      className="relative w-full h-fit"
    >
      <div className=" w-[21.625rem] mx-auto mt-7 flex flex-col gap-12 sm:w-528 sm:gap-20 lg:w-3/4">
        <header className="flex items-center gap-4 justify-between pr-2">
          <Image className=" w-14 h-14" src={Logo} alt="car" />
          <Image className=" w-8 h-8 lg:hidden" src={Menu} alt="car" />
          <div className="hidden lg:flex lg:gap-10">
            <Button
              label="CADASTRAR"
              size="base"
              color="yellow"
              shape="rounded"
              onClick={handleOpenRegister}
            />
            <Button
              label="ENTRAR"
              size="base"
              color="yellow"
              shape="rounded"
              onClick={handleOpenLogin}
            />
          </div>
        </header>
        <main className="flex flex-col w-8/12 gap-10 my-auto sm:gap-10 mt-28">
          <Text
            label="Compartilhe viagens, economize e proteja o planeta."
            size="5xl"
            weight="bold"
            className="leading-[3rem]"
          />
          <div className="flex flex-col gap-10">
            <div className="w-3/4">
              <Text
                label="Pegue carona conosco e descubra como economizar dinheiro, fazer novas amizades e reduzir sua pegada de carbono, tudo isso enquanto aproveita uma viagem confortável e segura!"
                color="gray"
                size="md"
                className=""
              />
            </div>
            <div className="">
              <Button
                label="VER MAIS"
                onClick={handleOpenRegister}
                size="base"
                color="yellow"
                shape="rounded"
              />
            </div>
          </div>
          {/* <RideFull /> */}
        </main>

        <Login handleClose={handleCloseLogin} visible={showLogin} />
        <Register handleClose={handleCloseRegister} visible={showRegister} />
      </div>
    </div>
  );
}
