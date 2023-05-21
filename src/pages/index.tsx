import { Inter } from "next/font/google";
import Text from "@/components/text";
import Button from "@/components/button";
import RideFull from "@/components/rideFull";
import Register from "@/components/register/register";
import Login from "@/components/login/login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      // className=""
      className="relative w-full"
    >
      <div className="w-[80rem] mx-auto">
        <header className="flex items-center gap-4 py-12 justify-end">
          {/* <Image className="w-48 h-48" src={Logo} alt="car" /> */}
           {/* <Button label="Entrar" size="md" color="yellow" shape="rounded" onClick={Login} />
           <Button label="Cadastrar" size="md" color="yellow" shape="rounded" onClick={Register} /> */}
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
            <Button label="Conhecer" onClick={Register} size="lg" color="yellow" shape="rounded" />
          </div>
        </main>
      <Register/>
      </div>
    </div>
  );
}