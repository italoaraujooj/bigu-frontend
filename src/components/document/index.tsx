import { UserResponseDTO } from "@/types/types";
import Image from "next/image";
import WomanAvatar from "../../assets/woman.png";
import Homem from "../../assets/avatar.png";
import { evaluateUserDocument } from "@/services/auth";
import { Dispatch, SetStateAction, useContext } from "react";
import { toast } from "react-toastify";

interface Props {
    user: UserResponseDTO
    toggleViewPhoto: (id: string) => void;
    setShouldFetch: Dispatch<SetStateAction<boolean>>
}

function Document(props: Props) {
    
    const { user, toggleViewPhoto, setShouldFetch } = props;

    const handleApproveDocument = async () => {
        try{
            const response = await evaluateUserDocument(user.userId, {isApproved: true})
            if(response && response.status === 200){
                console.log(response.data.user)
                setShouldFetch((prev) => !prev)
                toast.success("O documento do usuário foi aceito.");
            }
        }catch(err: any){
            console.log(err);
            toast.error(err.message);
        }
    }

    const handleRejectDocument = async() => {
        try{
            const response = await evaluateUserDocument(user.userId, {isApproved: false, reason: 'Não aprovado'})
            if(response && response.status === 200){
                console.log(response.data.user)
                setShouldFetch((prev) => !prev)
                toast.success("O documento do usuário foi rejeitado.");
            }
        }catch(err: any){
            console.log(err);
            toast.error(err.message);
        }
    }
    
    return (
        <div className="bg-light-white w-full h-40 rounded-xl flex flex-col p-4 gap-4 sm:p-5">
            <div className="flex h-full w-full">
                <div className="flex flex-col w-full justify-between">
                    <div className="flex justify-between gap-4 items-center">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16">
                                {user?.sex === "Feminino" ? (
                                    <Image
                                        className="w-12 h-12 md:w-24 md:h-24 object-cover rounded-full transition duration-300"
                                        fill
                                        src={user?.profileImage? `data:image/jpeg;base64,${user.profileImage}` : WomanAvatar}
                                        alt="foto"
                                    />
                                    ) : (
                                    <Image
                                        className="w-12 h-12 md:w-24 md:h-24 object-cover rounded-full transition duration-300"
                                        fill
                                        src={user?.profileImage? `data:image/jpeg;base64,${user.profileImage}` : Homem}
                                        alt="foto"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-3 items-center">
                                    <h1 className="font-bold text-black font-['Poppins'] text-2xl sm:text-4xl md:text-4xl">
                                        {user.name.split(" ")[0]}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => handleApproveDocument()} className="font-[Poppins] bg-green w-24 h-10 px-4 text-sm rounded-lg font-semibold text-white">
                            Aprovar
                        </button>
                    </div>
                    
                    <div className="flex justify-between">
                        <button onClick={ () => toggleViewPhoto(user.userId)} className="font-[Poppins] bg-light-blue h-10 px-4 text-sm rounded-lg font-semibold text-white">
                            Visualizar documento
                        </button>
                        <button onClick={() => handleRejectDocument()} className="font-[Poppins] bg-red w-24 h-10 px-4 text-sm rounded-lg font-semibold text-white">
                            Rejeitar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Document;
