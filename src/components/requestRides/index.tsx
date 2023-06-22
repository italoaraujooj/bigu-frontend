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

type Props = {
    visible: boolean;
    handleClose: () => void;
};

function RidesRequests(props: Props) {
    const { visible, handleClose } = props;
    const { rides } = useContext(RideContext)
    const { user } = useContext(AuthContext)
    const [ridesUser, setRidesUser] = useState([]as any);
    const [carsUser, setCarsUser] = useState([] as any)

    useEffect(() => {
        getUserCars().then((data) => setCarsUser(data))
        if(carsUser.length > 0){
            getCandidates().then((data) =>{
                console.log(data)
                setRidesUser(data?.data)
            })
        }
    }, [rides]);

    return (
        <div
            className={clsx(
                "transition ease-in-out delay-150 duration-500",
                `flex justify-center items-start h-screen fixed bg-white w-[100%] overflow-y-scroll pt-3 px-5 top-0 lg:right-0 lg:max-w-[35.125rem]`,
                visible ? "translate-x-0" : "translate-x-full"
            )}
        >
            <div className="flex flex-col justify-between gap-4 w-full">
                <Image
                    className="w-10 h-10 cursor-pointer"
                    src={Back}
                    alt="voltar"
                    onClick={handleClose}
                />
                <h1 className="font-['Poppins'] font-semibold text-2xl md:text-3xl">
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