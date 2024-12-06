import React, { useContext } from "react";
import { Complaint, GoBack } from "@/components";
import { AuthContext } from "@/context/AuthContext";
// @ts-ignore
import Woman from "../assets/woman.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Homem from "../assets/avatar.png"

const OfferRide = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter()
  
  return (
    <div className="flex w-full items-center justify-center my-8">
      <div className="">
        <div className="">
          <GoBack />
        </div>
        <div className="bg-dark w-[21rem] sm:w-528 lg:w-[46rem] h-fit rounded-lg px-4 py-8 lg:px-14 lg:py-16 space-y-12">
          <header className="flex gap-4 items-center">
            {user?.sex === "Feminino" ?
              <Image
                onClick={() => router.push("/profile")}
                className="w-14 h-14"
                src={Woman}
                alt="foto"
              />
              :
              <Image
                onClick={() => router.push("/profile")}
                className="w-14 h-14"
                src={Homem}
                alt="foto"
              />
            }
            <h1 className="font-[Poppins] font-bold text-xl text-white"> {`Olá, ${user?.name.split(" ")[0]}! Faça sua parte, denuncie!`}</h1>
          </header>
          <Complaint />
        </div>
      </div>
    </div>
  );
};

export default OfferRide;
