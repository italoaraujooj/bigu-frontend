import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Offer from "./offers";
import { CaretRight } from "@phosphor-icons/react";
import { deleteRide, getMyRidesAvailable } from "@/services/ride";
import { Ride } from "@/utils/types";
import { toast } from "react-toastify";

type Props = {
    visible: boolean;
    handleClose: () => void;
    loadDataRidesAvailable: () => void;
};

function RidesOffers(props: Props) {
    const { visible, handleClose, loadDataRidesAvailable } = props;
    const [myRides, setMyRides] = useState<Ride[]>([]);
    const [shouldFetch, setShouldFetch] = useState<boolean>(true);
    useEffect(() => {
        const loadData = async () => {
            if(shouldFetch){
                const response = await getMyRidesAvailable();
                setMyRides(response?.data.userDriverActivesHistory)
                setShouldFetch(false);
            }
        }
        loadData();
    }, [shouldFetch])

    const handleDeleteRide = async (ride: Ride) => {
        try {
          await deleteRide(ride.id);
          setShouldFetch(true);
          loadDataRidesAvailable();
          
          toast.success("A carona foi cancelada com sucesso");
          handleClose();
        } catch (err: any) {
          toast.error("Falha ao cancelar a carona");
          handleClose();
          console.log(err);
        }
      };

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

                {myRides.map((ride: Ride, index: number) => {
                    return (
                        <Offer
                            key={index}
                            ride={ride}
                            handleClose={handleClose}
                            handleDeleteRide={handleDeleteRide}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default RidesOffers;