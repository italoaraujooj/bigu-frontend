import clsx from "clsx";
import Image from "next/image";
import Back from "../../assets/CaretRight.svg";
import { RideContext } from "@/context/RideContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Offer from "./offers";
import { CaretRight } from "@phosphor-icons/react";

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
                `flex justify-center items-start h-screen fixed bg-[#1a1a1a] w-[100%] overflow-y-scroll pt-3 px-5 top-0 lg:right-0 lg:max-w-[38rem]`,
                visible ? "translate-x-0" : "translate-x-full"
            )}
        >
            <div className="flex flex-col justify-between gap-4">
                <CaretRight size={32} color="white" onClick={handleClose} className="cursor-pointer my-4" weight="bold"/>

                <h1 className="font-['Poppins'] font-semibold text-2xl md:text-3xl text-white my-2">
                    Caronas oferecidas por você
                </h1>

                {rides?.map((ride: any, index: number) => {
                    
                    const isDriver = ride.driver.userId === user?.userId;

                    if (isDriver) {
                        return (
                            <Offer
                                key={index}
                                ride={ride}
                                handleClose={handleClose}
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