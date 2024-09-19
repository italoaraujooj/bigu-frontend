import clsx from "clsx";
import Avatar from "../../assets/avatar.png"
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getCandidates, getMyRidesAvailable } from "@/services/ride";
import CandidateRequest from "./candidate";
import { getUserCars } from "@/services/car";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { CandidateResponseDTO, RideResponseDTO } from "@/types/ride";

type Props = {
    visible: boolean;
    handleClose: () => void;
};

function RidesRequests(props: Props) {
    const { visible, handleClose } = props;
    const [myRides, setMyRides] = useState<RideResponseDTO[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const myRides = await getMyRidesAvailable();
            if (myRides) setMyRides(myRides.data.userDriverActivesHistory);
        }

        loadData();
    }, []);
    return (
        <div
            className={clsx(
                "transition ease-in-out delay-150 duration-500",
                `flex justify-center items-start h-screen fixed bg-[#1a1a1a] w-[100%] overflow-y-scroll pt-3 px-12 top-0 lg:right-0 lg:max-w-[38rem] shadow-2xl`,
                visible ? "translate-x-0" : "translate-x-full"
            )}
        >
            <div className="flex flex-col justify-between gap-4 w-full">
                <CaretRight size={32} color="white" onClick={handleClose} className="cursor-pointer my-4" weight="bold" />
                <h1 className="font-['Poppins'] font-semibold text-2xl md:text-3xl text-white my-2">
                    Solicitações de carona
                </h1>
                {myRides.map((ride: RideResponseDTO, index: number) => {
                    if (ride.candidates && ride.candidates.length > 0) {
                        return (
                            <>
                                {ride.candidates.map((candidate: CandidateResponseDTO, candidateIndex: number) => (
                                    <CandidateRequest
                                        key={`${ride}-${candidate.user.userId}`}
                                        ride={ride}
                                        candidate={candidate}
                                        avatar={Avatar}
                                        handleClose={handleClose}
                                    />
                                ))}
                            </>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

export default RidesRequests;