import Button from "@/components/button";
import { formatarData, formatarTelefone } from "@/utils/masks";
import Notification from "@/components/notification";
import Image from "next/image";
import NotificationContext from "@/context/NotificationContext";
import { useContext } from "react";
import { deleteRide } from "@/services/ride";
import { toast } from "react-toastify";

type Props = {
    ride: any
}

function Offer(props: Props) {
    const { ride } = props;

    const {notificationHandler, showNotification} = useContext(NotificationContext);


    const handleDeleteRide = async () => {
        try{
            const response = await deleteRide(ride.id);
            console.log(response);
            toast.success("A carona foi cancelada com sucesso");
        }catch(err: any){
            toast.error("Falha ao cancelar a carona");
            console.log(err)
        }
    }

    const handleEditRide = async () => {
        console.log()
    }

    return (
        <div className="flex justify-between bg-background rounded-lg p-4 bg-stone-200 border border-warmGray-400 border-solid gap-2">
            <div className="flex flex-col gap-2">

                <p className="font-[Poppins] font-medium">
                    {ride?.start.district} - {ride?.destination.district}
                </p>

                <p className="font-[Poppins] font-medium ">
                    {ride?.numSeats}{" "}
                    {Number(ride?.numSeats) > 1
                        ? "vagas disponíveis"
                        : "vaga disponível"}{" "}
                </p>

                <p className="font-[Poppins] font-medium ">
                    {formatarData(ride?.dateTime)}
                    
                </p>

            </div>
            <div className="flex flex-col justify-center gap-2">
                <Button
                    label="Cancelar"
                    size="res"
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