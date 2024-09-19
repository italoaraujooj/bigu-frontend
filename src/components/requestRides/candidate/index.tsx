import { formatarData, formatarTelefone } from "@/utils/masks";
import Button from "../../button";
import Image from "next/image";
import { answerCandidate } from "@/services/ride";
import NotificationContext from "@/context/NotificationContext";
import Notification from "@/components/notification";
import Text from "@/components/text";
import { toast } from "react-toastify";
import { CandidateResponseDTO, RideResponseDTO } from "@/types/ride";

type Props = {
  avatar: any;
  ride: RideResponseDTO;
  handleClose: any;
  candidate: CandidateResponseDTO
};

const CandidateRequest = (props: Props) => {
  const { avatar, ride, handleClose, candidate } = props;
  const handleAcceptCandidate = async () => {
    try {
      const body = { status: "accept" };
      const response = await answerCandidate(body, ride.rideId, candidate.user.userId);
      if (response?.status === 200) {
        toast.success("O usuário foi adicionado a carona com sucesso");
        handleClose();
      }

    } catch (err: any) {
      toast.error("Falha ao aceitar o usuário");
      console.log(err);
    }
  };

  const handleRejectCandidate = async () => {
    try {
      const body = { status: "declined" };
      const response = await answerCandidate(body, ride.rideId, candidate.user.userId);
      if (response?.status === 200) {
        toast.success("Você rejeitou o usuário para sua carona");
      }
      handleClose();

    } catch (err: any) {
      toast.error("Falha ao rejeitar o usuário");
      console.log(err);
    }
  };

  console.log(ride)
  console.log(candidate)

  return (
    <div className="w-[500px] bg-white  rounded-lg px-10 py-6 bg-stone-200 shadow-xl ">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <Image className="w-12 h-12" src={avatar} alt="ft" />
          <p className="font-[Poppins] font-bold text-lg">
            {String(candidate.user.name)?.toUpperCase()}
          </p>
        </div>
        <div className="space-y-2">
          <>
            <Text label="Local:" color="dark" size="base" weight="bold" />
            <Text
              label={`${candidate.address.rua}, ${candidate.address.bairro} - ${candidate.address.numero}`}
              color="gray"
              size="base"
            />
          </>

          <>
            <Text label="Telefone:" color="dark" size="base" weight="bold" />
            <Text
              label={formatarTelefone(candidate.user.phoneNumber)}
              color="gray"
              size="base"
            />
          </>

          <>
            <Text label="Horário/Dia:" color="dark" size="base" weight="bold" />
          </>
        </div>
      </div>
      <div className="flex gap-4 mt-6 mb-2 items-center">
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
