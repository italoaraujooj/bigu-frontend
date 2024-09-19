import Button from "@/components/button";
import { formatarData, formatarTelefone } from "@/utils/masks";
import { deleteRide } from "@/services/ride";
import { toast } from "react-toastify";
import Text from "@/components/text";
import { Ride } from "@/utils/types";
import { RideResponseDTO } from "@/types/ride";

type Props = {
  ride: RideResponseDTO;
  handleClose: () => void;
  handleDeleteRide: (ride: RideResponseDTO) => void;
};

function Offer(props: Props) {
  const { ride } = props;

  const handleEditRide = async () => {
    console.log();
  };

  return (
    <div className="w-[400px] rounded-lg px-10 py-6 bg-white shadow-xl ">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-8">
          <div>
            <Text label="Origem:" color="dark" size="base" weight="bold" />
            <Text label={ride.startAddress.bairro} color="gray" size="base" />
          </div>
          <div>
            <Text label="Destino:" color="dark" size="base" weight="bold" />
            <Text label={ride.destinationAddress.bairro} color="gray" size="base" />
          </div>
        </div>

        <div>
          <Text label="Vagas:" color="dark" size="base" weight="bold" />
          <Text label={Number(ride.numSeats - ride.members.length) != 1 ? ride.numSeats + " vagas disponíveis" : ride.numSeats + " vaga disponível"} color="gray" size="base" />
        </div>

        <div>
          <Text label="Data e hora:" color="dark" size="base" weight="bold" />
          <Text label={formatarData(ride.scheduledTime)} color="gray" size="base" />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2 mt-4">
        <Button
          label="Cancelar"
          size="base"
          color="red"
          className="uppercase"
          shape="square"
          onClick={() => props.handleDeleteRide(ride)}
        />
      </div>
    </div>
  );
}

export default Offer;
