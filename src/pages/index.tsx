import { useState } from "react";
import { Text, Button, Register, Login } from "@/components";
import Image from "next/image";
import Logo from "../assets/car-secondary.png";
import Menu from "../assets/Menu.png";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLoginModal = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const closeLoginModal = () => {
    setShowLogin(false);
  };

  const handleOpenRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  return (
    <div className="relative w-full h-fit">
      <div className=" w-[21.625rem] mx-auto mt-7 flex flex-col gap-12 sm:w-528 sm:gap-20 lg:w-3/4">
        <header className="flex items-center gap-4 justify-between pr-2">
          <Image className=" w-14 h-14" src={Logo} alt="car" />
          <Image className=" w-8 h-8 lg:hidden" src={Menu} alt="car" />
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
            size="5xl"
            weight="bold"
            className="leading-[3rem]"
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
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context
) => {
  const data = [] as any;

  const cookies = parseCookies(context);
  const token = cookies.token;
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
