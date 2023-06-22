import clsx from "clsx";
import Image from "next/image";
import Back from "../../assets/CaretRight.svg";
import Avatar from "../../assets/avatar.png"
import { RideContext } from "@/context/RideContext";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getCandidates } from "@/services/ride";
import CandidateRequest from "./candidate";
import { getUserCars } from "@/services/car";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type Props = {
    visible: boolean;
    handleClose: () => void;
};

function RidesRequests(props: Props) {
    const { visible, handleClose } = props;
    const { ridesUser, setRidesUser} = useContext(RideContext);
    
    // const { user } = useContext(AuthContext)
    // // const [ridesUser, setRidesUser] = useState([]as any);
    // const [carsUser, setCarsUser] = useState([] as any)

    // useEffect(() => {
    //     getUserCars().then((data) => setCarsUser(data))
    //     console.log('ride request');
    //     console.log(carsUser);
    //     if(carsUser.length > 0){
    //         console.log('entrei aqui')
    //         getCandidates().then((data) =>{
    //             console.log(data)
    //             setRidesUser(data?.data)
    //         })
    //     }
    // }, [rides]);

    return (
        <div
            className={clsx(
                "transition ease-in-out delay-150 duration-500",
                `flex justify-center items-start h-screen fixed bg-[#1a1a1a] w-[100%] overflow-y-scroll pt-3 px-12 top-0 lg:right-0 lg:max-w-[38rem] shadow-2xl`,
                visible ? "translate-x-0" : "translate-x-full"
            )}
        >
            <div className="flex flex-col justify-between gap-4 w-full">
                <CaretRight size={32} color="white" onClick={handleClose} className="cursor-pointer my-4" weight="bold"/>
                <h1 className="font-['Poppins'] font-semibold text-2xl md:text-3xl text-white my-2">
                    Solicitações de carona
                </h1>
                {ridesUser?.map((ride: any, index: number) => {
                    // Verificar se ride.userResponse.userId não está presente em nenhum objeto de ride.rideResponse.riders
                    const isUserNotRider = !ride.rideResponse.riders.some((rider: any) => rider.userId === ride.userResponse.userId);

                    // Renderizar o componente CandidateRequest apenas se isUserNotRider for verdadeiro
                    if (isUserNotRider) {
                        return (
                            <CandidateRequest
                                key={index}
                                ride={ride}
                                avatar={Avatar}
                                setRidesUser={setRidesUser}
                                ridesUser={ridesUser}
                                handleClose={handleClose}
                            />
                        );
                    }

                    return null; // Retorna null se o ride.userResponse.userId estiver em ride.rideResponse.riders
                })}
            </div>
        </div>
    );
}

export default RidesRequests;