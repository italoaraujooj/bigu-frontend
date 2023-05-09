import Image from "next/image";
import { Inter } from "next/font/google";
import Register from "@/components/register/register";
import Text from "@/components/text";
import Button from "@/components/button";
import Profile from "@/components/profile";
import Ride from "@/components/ride";
import RideFull from "@/components/rideFull";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      // className=""
      className="relative w-full "
    >
      <div className="w-[70rem] mx-auto">
        <header className="flex items-center gap-4 py-12">
          {/* <Image className="w-48 h-48" src={Logo} alt="car" /> */}
          {/* <Text label="Bigu" size="lg" weight="bold" /> */}
        </header>
        {/* <Ride /> */}
        <main className="w-3/4 my-36">
          <Text
            label="Compartilhe viagens, economize e proteja o planeta."
            size="6xl"
            weight="bold"
            className="leading-[5rem]"
          />
          <div className="w-3/4">
            <Text
              label="Pegue carona conosco e descubra como economizar dinheiro, fazer novas amizades e reduzir sua pegada de carbono, tudo isso enquanto aproveita uma viagem confortável e segura!"
              color="gray"
              size="md"
              className="my-6"
            />
          </div>
          <div className="my-8">
            <Button label="Conhecer" onClick={() => {}} size="lg" color="yellow" shape="rounded" />
          </div>
        </main>
      </div>
      { <RideFull /> }
    </div>
  );
}