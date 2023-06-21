import { formatarTelefone } from "@/utils/masks";
import Button from "../button";
import Image from "next/image";
import { answerCandidate } from "@/services/ride";
import { useContext } from "react";
import NotificationContext from "@/context/NotificationContext";
import Notification from "@/components/notification";

type Props = {
    avatar: any,
    ride: any,
    setRidesUser: any,
    ridesUser: any
}

const CandidateRequest = (props: Props) => {
    const { avatar, ride, setRidesUser, ridesUser} = props;
    const {notificationHandler, showNotification} = useContext(NotificationContext);

    const handleAcceptCandidate = async () => {
        try{
            const body = {...ride, accepted: true};
            console.log(body)
            const response = await answerCandidate(body)
            if(response?.status === 200){
                notificationHandler("success", "O usuário foi adicionado a carona com sucesso");
                const aux = ridesUser
                const obj = aux.find((item: any) => item.candidateId === ride.candidateId && item.rideId === ride.candidateId);
                const index = aux.indexOf(obj);
                if (index > -1) {
                    aux.splice(index, 1);
                }
                setRidesUser(aux)
            }
        }catch(err: any){
            notificationHandler("fail", "Falha ao rejeitar o usuário");
            console.log(err)
        }
    }

    const handleRejectCandidate = async () => {
        const body = {...ride, accepted: false};
        console.log(body)
        //const response = await answerCandidate(body)
    }

    return (
        <div className="flex justify-between bg-background rounded-lg p-4 bg-stone-200 border border-warmGray-400 border-solid">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <Image className="w-8 h-8" src={avatar} alt='ft' />
                    <p className="font-[Poppins] font-bold text-lg">
                        {ride?.userResponse?.fullName}
                    </p>
                </div>

                <p className="font-[Poppins] font-medium">
                    Local: {ride?.addressResponse.street}, {ride?.addressResponse.number} - {ride?.addressResponse.district}
                </p>

                <p className="font-[Poppins] font-medium ">
                    Telefone: {formatarTelefone(ride?.userResponse?.phoneNumber)}
                </p>

                <p className="font-[Poppins] font-medium ">
                    Telefone: {formatarTelefone(ride?.userResponse?.phoneNumber)}
                </p>

            </div>
            <div className="flex flex-col gap-2">
                <Button
                    label="Aceitar"
                    size="res"
                    color="green"
                    className="uppercase"
                    shape="square"
                    onClick={handleAcceptCandidate}
                />
                <Button
                    label="Recusar"
                    size="res"
                    color="red"
                    className="uppercase"
                    shape="square"
                    onClick={handleRejectCandidate}
                />
            </div>
            {showNotification && <Notification/>}
        </div>
    );
}
 
export default CandidateRequest;