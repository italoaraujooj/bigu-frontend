import { formatarData, formatarTelefone } from "@/utils/masks";
import Button from "../../button";
import Image from "next/image";
import { answerCandidate } from "@/services/ride";
import { useContext } from "react";
import NotificationContext from "@/context/NotificationContext";
import Notification from "@/components/notification";
import Text from "@/components/text";
import { toast } from "react-toastify";

type Props = {
  avatar: any;
  ride: any;
  setRidesUser: any;
  ridesUser: any;
  handleClose: any;
};

const CandidateRequest = (props: Props) => {
  const { avatar, ride, setRidesUser, ridesUser, handleClose } = props;
  const { notificationHandler, showNotification } =
    useContext(NotificationContext);
console.log(ridesUser);
  const handleAcceptCandidate = async () => {
    try {
      const body = { ...ride, accepted: true };
      console.log(body);
      const response = await answerCandidate(body);
      if (response?.status === 200) {
        // notificationHandler(
        //   "success",
        //   "O usuário foi adicionado a carona com sucesso"
        // );
        toast.success("O usuário foi adicionado a carona com sucesso");
        handleClose();
        // setRidesUser({...setRidesUser, body });
            // console.log(response);
      }

    } catch (err: any) {
      toast.error("Falha ao aceitar o usuário");
      // notificationHandler("fail", "Falha ao aceitar o usuário");
      console.log(err);
    }
  };

  const handleRejectCandidate = async () => {
    try {
      const body = { ...ride, accepted: false };
      console.log(body);
      const response = await answerCandidate(body);
      if (response?.status === 200) {
        // notificationHandler(
        //   "success",
        //   "Você rejeitou o usuário para sua carona"
        // );
        toast.success("Você rejeitou o usuário para sua carona");
      }
      handleClose();

    } catch (err: any) {
      toast.error("Falha ao rejeitar o usuário");
      // notificationHandler("fail", "Falha ao rejeitar o usuário");
      console.log(err);
    }
  };

  return (
    <div className="w-[500px] bg-white  rounded-lg px-10 py-6 bg-stone-200 shadow-xl ">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <Image className="w-12 h-12" src={avatar} alt="ft" />
          <p className="font-[Poppins] font-bold text-lg">
            {String(ride?.userResponse?.fullName)?.toUpperCase()}
          </p>
        </div>

        {/* <p className="font-[Poppins] font-medium">
                    Local:
                </p> */}
        <div className="space-y-2">
          <>
            <Text label="Local:" color="dark" size="base" weight="bold" />
            <Text
              label={`${ride?.addressResponse.street}, ${ride?.addressResponse.number} - ${ride?.addressResponse.district}`}
              color="gray"
              size="base"
            />
          </>

          <>
            <Text label="Telefone:" color="dark" size="base" weight="bold" />
            <Text
              label={formatarTelefone(ride?.userResponse?.phoneNumber)}
              color="gray"
              size="base"
            />
          </>

          <>
            <Text label="Horário/Dia:" color="dark" size="base" weight="bold" />
            <Text
              label={formatarData(ride?.rideResponse?.dateTime)}
              color="gray"
              size="base"
            />
          </>
        </div>
        {/* <p className="font-[Poppins] font-medium ">
          Telefone: {formatarTelefone(ride?.userResponse?.phoneNumber)}
        </p>

        <p className="font-[Poppins] font-medium ">
          Horário/Dia: {formatarData(ride?.rideResponse?.dateTime)}
        </p> */}
      </div>
      <div className="flex gap-4 mt-6 mb-2 items-center justify-center">
        <Button
          label="Aceitar"
          size="base"
          color="green"
          className="uppercase"
          shape="square"
          onClick={handleAcceptCandidate}
        />
        <Button
          label="Recusar"
          size="base"
          color="red"
          className="uppercase"
          shape="square"
          onClick={handleRejectCandidate}
        />
      </div>
     <Notification />
    </div>
  );
};

export default CandidateRequest;
