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
  handleEditRide: (ride: string) => void;
};

function Offer(props: Props) {
  const { ride } = props;

  return (
    <div className="w-full rounded-lg px-10 py-6 bg-white shadow-xl">
      <div className="flex flex-col gap-2">
          <div>
            <Text label="📍 Origem:" color="dark" size="base" weight="bold" />
            <Text label={ride.startAddress.rua + ', ' + ride.startAddress.numero + ', ' + ride.startAddress.bairro } color="gray" size="base" />
          </div>

          <div>
            <Text label="📍 Destino:" color="dark" size="base" weight="bold" />
            <Text label={ride.destinationAddress.rua + ', ' + ride.destinationAddress.numero + ', '+ ride.destinationAddress.bairro} color="gray" size="base" />
          </div>

          <div>
            <Text label="🚙 Vagas disponíveis:" color="dark" size="base" weight="bold" />
            <Text label={Number(ride.numSeats) - ride.members.length > 1 ? ride.numSeats + " vagas disponíveis" : Number(ride.numSeats) - ride.members.length + " vaga disponível"} color="gray" size="base" />
          </div>

          <div>
            <Text label="⏰ Data e hora:" color="dark" size="base" weight="bold" />
            <Text label={formatarData(ride.scheduledTime)} color="gray" size="base" />
          </div>

          <div>
            <Text label="🙋 Membros:" color="dark" size="base" weight="bold" />
            {ride.members && ride.members.length > 0 ? (
              <ul>
                {ride.members.map((member, index) => (
                  <li key={index}>
                    <Text label={`- ${member.user.name}`} color="gray" size="base" />
                  </li>
                ))}
              </ul>
            ) : (
              <Text label="Sem membros por enquanto..." color="gray" size="base" />
            )}
          </div>

      </div>
      <div className="flex flex-row justify-center gap-2 mt-4">
        <Button
          label="Cancelar"
          size="sm"
          color="red"
          className="uppercase"
          shape="square"
          onClick={() => props.handleDeleteRide(ride)}
        />

        <Button
          label="Editar"
          size="sm"
          color="dark-blue"
          className="uppercase"
          shape="square"
          onClick={() => props.handleEditRide(ride.rideId)}
        />
      </div>
    </div>
  );
}

export default Offer;
