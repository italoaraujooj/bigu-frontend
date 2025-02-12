import { GoBack } from '@/components';
import { getUserById } from '@/services/auth';
import { UserResponseDTO } from '@/types/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<UserResponseDTO>()

  useEffect(() => {
    if (typeof id === 'string') {
      loadUser(id);
    }
  }, [id]);
  
  const loadUser = async (id: string) => {
    try{
        const response = await getUserById(id as string);
        console.log(response)
    }catch(error: any){
        toast.error(error.message)
    }
  }

    return (
        <div className="flex justify-center items-center my-12">
            <div className="w-[90%] flex flex-col gap-2 lg:max-w-[1024px]">
                <div className="w-full flex gap-1 justify-start">
                    <GoBack />
                    <p
                        className="cursor-pointer hover:text-stone-400 text-gray text-md font-[Poppins]"
                        onClick={() => router.push("/dashboard")}
                    >
                        Voltar para tela inicial
                    </p>
                </div>
                <div className=" w-full flex flex-col rounded-lg gap-3">

                </div>
            </div>
        </div>
    );
};

export default UserPage;