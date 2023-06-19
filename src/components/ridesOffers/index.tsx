import clsx from "clsx";
import Image from "next/image";
import Back from "../../assets/CaretRight.svg";
import Button from "../button";
import Avatar from "../../assets/avatar.png"
import { RideContext } from "@/context/RideContext";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getCandidates } from "@/services/ride";

type Props = {
    visible: boolean;
    handleClose: () => void;
};

function RidesOffers(props: Props) {
    const { visible, handleClose } = props;
    const { rides } = useContext(RideContext)
    const { user } = useContext(AuthContext)
    const [ridesUser, setRidesUser] = useState([]);

    // useEffect(() => {
    //     console.log(rides)
        

    // },[rides])

    return (
        <div
            id="login"
            className={clsx(
                "transition ease-in-out delay-150 duration-500",
                `flex justify-center items-start h-screen fixed bg-white w-[100%] overflow-y-scroll pt-3 top-0 lg:right-0 lg:max-w-[30.125rem]`,
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
                <h1 className="font-['Poppins'] font-semibold text-2xl md:text-3xl">
                    Caronas oferecidas
                </h1>
            </div>
        </div>
    );
}

export default RidesOffers;