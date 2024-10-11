import { deleteRide, getMyRidesAvailable } from "@/services/ride";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Offer from "./offers";
//import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { RideResponseDTO } from "@/types/ride";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import Router from "next/router";
import { toast } from "react-toastify";

type Props = {
  visible: boolean;
  handleClose: () => void;
  loadDataRidesAvailable: () => void;
};

function RidesOffers(props: Props) {
  const { visible, handleClose, loadDataRidesAvailable } = props;
  const [myRides, setMyRides] = useState<RideResponseDTO[]>([]);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  useEffect(() => {
    const loadData = async () => {
      if (shouldFetch) {
        const response = await getMyRidesAvailable();

        setMyRides(response?.data.userDriverActivesHistory);
        setShouldFetch(false);
      }
    };
    loadData();
  }, [shouldFetch]);

  const handleDeleteRide = async (ride: RideResponseDTO) => {
    try {
      await deleteRide(ride.rideId);
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

  const handleEditRide = async (rideId: string) => {
    Router.push(`/edit-ride/${rideId}`);
  };

  return (
    <div
      id="rideOffers"
      className={clsx(
        "transition ease-in-out delay-150 duration-500",
        `h-screen w-full fixed bg-[#1a1a1a] overflow-y-scroll p-4 top-0 right-0 sm:p-8 md:p-10 lg:max-w-[35%]`,
        visible ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex flex-col justify-between items-start gap-4 mb-3">
        <CaretRight
          size={32}
          color="white"
          onClick={handleClose}
          className="cursor-pointer self-start"
          weight="bold"
        />

        <h1 className="font-['Poppins'] font-semibold text-2xl sm:text-3xl text-white my-2">
          Suas caronas oferecidas:
        </h1>

        {myRides.map((ride: RideResponseDTO, index: number) => {
          return (
            <Offer
              key={index}
              ride={ride}
              handleClose={handleClose}
              handleDeleteRide={handleDeleteRide}
              handleEditRide={handleEditRide}
              setMyRides={setMyRides}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RidesOffers;
