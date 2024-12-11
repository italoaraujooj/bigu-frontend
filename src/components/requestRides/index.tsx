import { getMyRidesAvailable } from "@/services/ride";
import { CandidateResponseDTO, RideResponseDTO } from "@/types/ride";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Avatar from "../../assets/avatar.png";
import CandidateRequest from "./candidate";

type Props = {
  visible: boolean;
  handleClose: () => void;
  myRides: RideResponseDTO[];
  setMyRides: Dispatch<SetStateAction<RideResponseDTO[]>>;
};

function RidesRequests(props: Props) {
  const { visible, handleClose, myRides, setMyRides } = props;

  return (
    <div
      id="rideRequests"
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
        <h1 className="font-['Poppins'] font-semibold text-2xl md:text-3xl text-white my-2">
          Solicitações de carona
        </h1>
        {myRides.map((ride: RideResponseDTO) => {
          if (ride.candidates && ride.candidates.length > 0) {
            return (
              <>
                {ride.candidates.map((candidate: CandidateResponseDTO) => (
                  <CandidateRequest
                    key={`${ride}-${candidate.user.userId}`}
                    ride={ride}
                    candidate={candidate}
                    avatar={Avatar}
                    handleClose={handleClose}
                    setMyRides={setMyRides}
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
