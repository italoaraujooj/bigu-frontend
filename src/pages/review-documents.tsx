import Document from "@/components/document";
import { getIdPhotoUserById, getUserWithDocumentStatusInReview } from "@/services/auth";
import { UserResponseDTO } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, GoBack, Text } from "@/components";
import Image from "next/image";

const ReviewDocuments = () => {

  const [users, setUsers] = useState<UserResponseDTO[]>([]);
  const [photo, setPhoto] = useState<string>();

  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const [photoFullScreen, setPhotoFullScreen] = useState<boolean>(false);


  const toggleViewPhoto = async (userId: string | null) => {
    if (userId) {
      try {
        const response = await getIdPhotoUserById(userId);
        if (response && response.status === 200) {
          setPhoto(response.data.photo)
          setPhotoFullScreen((prev) => !prev);
        }
      } catch (err: any) {
        console.log(err);
        toast.error(err.message);
      }
    }else{
      setPhotoFullScreen((prev) => !prev);
    }
  }

  useEffect(() => {
    const loadUsersDocumentStatusInReview = async () => {
      try {
        const response = await getUserWithDocumentStatusInReview()
        if (response && response.status == 200) {
          setUsers(response.data.users)
        }
      } catch (err: any) {
        console.log(err);
        toast.error(err.message);
      }
    }

    loadUsersDocumentStatusInReview();
  }, [shouldFetch])

  return (
    <div className="flex w-full items-center justify-center my-8">
      <div>
        <div>
          <GoBack />
        </div>
        <div className="bg-dark w-[24rem] sm:w-528 lg:w-[64rem] h-fit rounded-lg px-4 py-8 lg:px-14 lg:py-16 space-y-12">
          <Text
            label="Documentos para serem analisados"
            size="xl"
            weight="bold"
            className="uppercase"
          />
          <div className="max-w-[360px] rounded-2xl flex flex-col items-start gap-6 sm:max-w-xl md:max-w-3xl md:p-16 space-y-6 lg:max-w-4xl xl:max-w-4xl">
            {users && users.map((user, index) => (
              <div className="w-full" key={index}>
                <Document user={user} toggleViewPhoto={toggleViewPhoto} setShouldFetch={setShouldFetch}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      {photoFullScreen && (
        <div className="w-full h-full fixed top-0 left-0 bg-black z-50 flex flex-col items-center justify-center">
          <div className="relative h-1/2 w-full">
            <Image
              className=""
              fill
              src={`data:image/jpeg;base64,${photo}`}
              alt="foto"
            />
          </div>
          <Button
            label="Fechar foto"
            onClick={() => toggleViewPhoto(null)}
            size="res"
            color="red"
            shape="square"
            className="absolute top-4 right-4"
          />
        </div>
      )}
    </div>
  );
};

export default ReviewDocuments;
