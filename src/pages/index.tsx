import { Button, Login, Register, Text } from "@/components";
import { List } from "@phosphor-icons/react/dist/ssr/List";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { parseCookies } from "nookies";
import { useState } from "react";
import Logo from "../assets/car-secondary.png";
import Back from "../assets/CaretRight.svg";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const openLoginModal = () => {
    setShowLogin(true);
    setShowRegister(false);
    setSideBar(false);
  };

  const closeLoginModal = () => {
    setShowLogin(false);
  };

  const handleOpenRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
    setSideBar(false);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  const openSideBar = () => {
    setSideBar(true);
  };

  const closeSideBar = () => {
    setSideBar(false);
  };

  return (
    <div className="relative w-full h-fit">
      <div className="w-[80%] mx-auto mt-7 flex flex-col">
        <header className="flex items-center gap-4 justify-between pr-2">
          <Image className=" w-14 h-14" src={Logo} alt="car" />
          <List
            size={32}
            color="gray"
            className="lg:hidden cursor-pointer"
            onClick={openSideBar}
          />
          <section className="hidden lg:flex lg:gap-10">
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
              onClick={openLoginModal}
            />
          </section>
        </header>
        <main className="flex flex-col w-8/12 gap-10 my-auto sm:gap-10 mt-28">
          <Text
            label="Compartilhe viagens, economize e proteja o planeta."
            size="lg"
            weight="bold"
            className="leading-[3rem] md:text-4xl xl:text-6xl"
          />
          <div className="flex flex-col gap-10">
            <Text
              label="Pegue carona conosco e descubra como economizar dinheiro, fazer novas amizades e reduzir sua pegada de carbono, tudo isso enquanto aproveita uma viagem confortável e segura!"
              color="gray"
              size="md"
              className=""
            />
            <Button
              label="VER MAIS"
              onClick={handleOpenRegister}
              size="base"
              color="yellow"
              shape="rounded"
            />
          </div>
        </main>

        <Login handleClose={closeLoginModal} visible={showLogin} />
        <Register handleClose={handleCloseRegister} visible={showRegister} />
        {sideBar && (
          <div
            className={`bg-white w-full h-full fixed top-0 right-0 py-14 px-14 space-y-4 
    transition-transform transform ease-in-out duration-500 ${sideBar ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <Image
              className="w-10 h-10 cursor-pointer"
              src={Back}
              alt="voltar"
              onClick={closeSideBar}
            />
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
              onClick={openLoginModal}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (context) => {
  const data = [] as any;

  const cookies = parseCookies(context);
  const token = cookies['nextauth.accessToken'];

  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data,
    },
  };
};
