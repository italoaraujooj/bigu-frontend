import React, { useContext, useEffect, useState } from "react";
import { Text, Form, GoBack } from "@/components";
import { AuthContext } from "@/context/AuthContext";
// @ts-ignore
import Woman from "../../assets/woman.png";
import Image from "next/image";
import { useRouter } from "next/router";

const EditRide = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  const [rideId, setRideId] = useState<string>('');

  useEffect(() => {
    if (id) {
      setRideId(id as string);
    }
  }, [id]);
  
  return (
    <div className="flex w-full items-center justify-center my-16">
      <div className="">
        <div className="">
          <GoBack />
        </div>
        <div className="bg-dark w-[21rem] sm:w-528 lg:w-[64rem] h-fit rounded-lg px-4 py-8 lg:px-14 lg:py-16 space-y-12">
          <header className="flex gap-4 items-center">
            <Image className="w-14 h-14" src={Woman} alt="woman-avatar" />
            <h1 className="font-[Poppins] font-bold text-xl text-white"> {`Olá, ${user?.name.split(" ")[0]}`}</h1>
          </header>
          <Form rideId={rideId} />
        </div>
      </div>
    </div>
  );
};

export default EditRide;
