import Button from "@/components/button";
import { formatarData, formatarTelefone } from "@/utils/masks";
import Notification from "@/components/notification";
import NotificationContext from "@/context/NotificationContext";
import { useContext } from "react";
import { deleteRide } from "@/services/ride";
import { toast } from "react-toastify";
import Text from "@/components/text";

type Props = {
  ride: any;
  handleClose: any;
};

function Offer(props: Props) {
  const { ride } = props;

  const { notificationHandler, showNotification } =
    useContext(NotificationContext);

  const handleDeleteRide = async () => {
    try {
      const response = await deleteRide(ride.id);
      console.log(response);
      toast.success("A carona foi cancelada com sucesso");
      props.handleClose();
    } catch (err: any) {
      toast.error("Falha ao cancelar a carona");
      props.handleClose();
      console.log(err);
    }
  };

  const handleEditRide = async () => {
    console.log();
  };

  return (
    <div className="w-[400px] bg-white  rounded-lg px-10 py-6 bg-stone-200 shadow-xl ">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-8">
          <div>
            <Text label="Origem:" color="dark" size="base" weight="bold" />
            <Text label={ride?.start.district} color="gray" size="base" />
          </div>
          <div>
            <Text label="Destino:" color="dark" size="base" weight="bold" />
            <Text label={ride?.destination.district} color="gray" size="base" />
          </div>
        </div>

        <div>
            <Text label="Vagas disponíveis:" color="dark" size="base" weight="bold" />
            <Text label={Number(ride?.numSeats) > 1 ? ride?.numSeats + " vagas disponíveis" : ride?.numSeats + " vaga disponível"} color="gray" size="base" />
          </div>

          <div>
            <Text label="Data e hora:" color="dark" size="base" weight="bold" />
            <Text label={formatarData(ride?.dateTime)} color="gray" size="base" />
          </div>
        {/* <p className="font-[Poppins] font-medium">
          {ride?.start.district} - {ride?.destination.district}
        </p> */}
{/* 
        <p className="font-[Poppins] font-medium ">
          {ride?.numSeats}{" "}
          {Number(ride?.numSeats) > 1 ? "vagas disponíveis" : "vaga disponível"}{" "}
        </p> */}



        {/* <p className="font-[Poppins] font-medium ">
          {formatarData(ride?.dateTime)}
        </p> */}
      </div>
      <div className="flex flex-col justify-center gap-2 mt-4">
        <Button
          label="Cancelar"
          size="base"
          color="red"
          className="uppercase"
          shape="square"
          onClick={handleDeleteRide}
        />
      </div>
      <Notification />
    </div>
  );
}

export default Offer;
