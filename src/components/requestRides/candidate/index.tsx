import { formatarTelefone } from "@/utils/masks";
import Button from "../../button";
import Image from "next/image";
import { answerCandidate, getMyRidesAvailable } from "@/services/ride";
import Router from "next/router";
import Notification from "@/components/notification";
import Text from "@/components/text";
import { toast } from "react-toastify";
import { CandidateResponseDTO, RideResponseDTO } from "@/types/types";
import Whatsapp from "../../../assets/whatsapp.png"
import { Dispatch, SetStateAction } from "react";
import Homem from "../../../assets/avatar.png"
import WomanAvatar from "../../../assets/woman.png";
import { useRouter } from "next/router";

type Props = {
  avatar: any;
  ride: RideResponseDTO;
  handleClose: any;
  candidate: CandidateResponseDTO;
  loadDataMyRides: () => void
};

const CandidateRequest = (props: Props) => {
  const { ride, handleClose, candidate, loadDataMyRides } = props;
  const router = useRouter()

  // const loadDataMyRides = async () => {
  //   try{
  //     const myRides = await getMyRidesAvailable();
  //     console.log(myRides)
  //     if (myRides) setMyRides(myRides.data.userDriverActivesHistory);
  //   }catch(error: any){
  //     toast.error("Ocorreu um erro ao buscar as suas caronas.")
  //   }
  // }
  
  const handleAcceptCandidate = async () => {
    try {
      const body = { status: "accept", freeRide: false };
      const response = await answerCandidate(body, ride.rideId, candidate.user.userId);
      if (response?.status === 200) {
        toast.success("O usuário foi adicionado a carona com sucesso");
        loadDataMyRides();
        handleClose();
      }

    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleAcceptFreeCandidate = async () => {
    try {
      const body = { status: "accept", freeRide: true };
      const response = await answerCandidate(body, ride.rideId, candidate.user.userId);
      if (response?.status === 200) {
        toast.success("O usuário foi adicionado a carona com sucesso");
        loadDataMyRides();
        handleClose();
      }

    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleRejectCandidate = async () => {
    try {
      const body = { status: "declined" };
      const response = await answerCandidate(body, ride.rideId, candidate.user.userId);
      if (response?.status === 200) {
        toast.success("Você rejeitou o usuário para sua carona");
      }
      loadDataMyRides();
      handleClose();

    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleViewProfile = async (userId: string) => {
    Router.push(`/view-profile/${userId}`);
  };

  const phoneNumber = candidate.user.phoneNumber.replace(/[^\d]/g, '');

  return (
    <div className="w-full rounded-lg px-10 py-6 bg-white shadow-xl">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
              {candidate.user.sex === "Feminino" ?
                  <Image
                    onClick={() => router.push("/profile")}
                    className="w-12 h-12"
                    src={WomanAvatar}
                    alt="foto"
                  />
                  :
                  <Image
                    onClick={() => router.push("/profile")}
                    className="w-12 h-12" 
                    src={Homem}
                    alt="foto"
                  />
                  }
            <p
              className="font-[Poppins] font-bold text-lg cursor-pointer hover:text-blue-500"
              onClick={() => handleViewProfile(candidate.user.userId)}
            >
              {String(candidate.user.name)?.toUpperCase()}
            </p>
          </div>
          <div className="justify-end">
            <a
              href={`https://wa.me/55${phoneNumber}`}
              target="_blank"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full shadow-md">
                <Image src={Whatsapp} alt="WhatsApp Icon" />
              </div>
            </a>
          </div>
        </div>
        <div className="space-y-2">
          <>
            <Text label={`🙋 Matrícula`} color="dark" size="base" weight="bold" />
            <Text
              label={candidate.user.matricula}
              color="gray"
              size="base"
            />
          </>

          <>
            <Text label={`⭐ Avaliação`} color="dark" size="base" weight="bold" />
            <Text
              label={candidate.user.avgScore + ' estrelas'}
              color="gray"
              size="base"
            />
          </>

          <>
            <Text label="📍 Local:" color="dark" size="base" weight="bold" />
            <Text
              label={`${candidate.address.rua}, ${candidate.address.bairro} - ${candidate.address.numero}`}
              color="gray"
              size="base"
            />
          </>

          <>
            <Text label="📫 E-mail:" color="dark" size="base" weight="bold" />
            <Text
              label={candidate.user.email}
              color="gray"
              size="base"
            />
          </>

          <>
            <Text label="📞 Telefone:" color="dark" size="base" weight="bold" />
            <Text
              label={formatarTelefone(candidate.user.phoneNumber)}
              color="gray"
              size="base"
            />
          </>

          <>
            <Text label="💸 Contribuição:" color="dark" size="base" weight="bold" />
            <Text
              label={"R$ " + String(candidate.suggestedValue)}
              color="gray"
              size="base"
            />
          </>
        </div>
      </div>
      <div className="flex gap-4 mt-6 mb-2 items-center">
        <Button
          label="Aceitar com Contribuição"
          size="base"
          color="green"
          className="uppercase flex-1"
          shape="square"
          onClick={handleAcceptCandidate}
        />
        <Button
          label="Aceitar de Graça"
          size="base"
          color="yellow"
          className="uppercase flex-1"
          shape="square"
          onClick={handleAcceptFreeCandidate}
        />
      </div>

      <div className="w-full mt-6 mb-2 flex justify-center">
        <Button
          label="Recusar"
          size="base"
          color="red"
          className="uppercase flex-1"
          shape="square"
          onClick={handleRejectCandidate}
        />
      </div>

     <Notification />
    </div>
  );
};

export default CandidateRequest;
