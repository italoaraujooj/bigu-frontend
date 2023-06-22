import clsx from "clsx";
import Image from "next/image";
import Back from "../../assets/CaretRight.svg";
import { RideContext } from "@/context/RideContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Offer from "./offers";

type Props = {
    visible: boolean;
    handleClose: () => void;
};

function RidesOffers(props: Props) {
    const { visible, handleClose } = props;
    const { rides } = useContext(RideContext);
    const { user } = useContext(AuthContext);



    return (
        <div
            id="login"
            className={clsx(
                "transition ease-in-out delay-150 duration-500",
                `flex justify-center items-start h-screen fixed bg-white w-[100%] overflow-y-scroll pt-3 px-5 top-0 lg:right-0 lg:max-w-[30.125rem]`,
                visible ? "translate-x-0" : "translate-x-full"
            )}
        >
            <div className="flex flex-col justify-between gap-4">
                <Image
                    className="w-10 h-10 cursor-pointer"
                    src={Back}
                    alt="voltar"
                    onClick={handleClose}
                />
                <h1 className="font-['Poppins'] font-semibold text-xl md:text-2xl">
                    Caronas oferecidas por você
                </h1>

                {rides?.map((ride: any, index: number) => {
                    
                    const isDriver = ride.driver.userId === user?.userId;

                    if (isDriver) {
                        return (
                            <Offer
                                key={index}
                                ride={ride}
                            />
                        );
                    }

                    return null; 
                })}
            </div>
        </div>
    );
}

export default RidesOffers;