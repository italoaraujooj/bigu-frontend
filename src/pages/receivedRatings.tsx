import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Ratings from "@/components/ratings";
import { getUserRatings } from "@/services/ratings";
import { RatingResponseDTO } from "@/types/types";
import { GoBack } from "@/components";

const ReceivedRatings = () => {
  const { user } = useContext(AuthContext);
  const [ratings, setRatings] = useState<RatingResponseDTO[]>([]);

  useEffect(() => {
    if (user?.userId) {
      loadDataRatings();

      //   if (shouldFetch) {
      //     setShouldFetch(false);
      //   }
    }
  }, [user?.userId]);

  const loadDataRatings = async () => {
    const responseRatings = await getUserRatings(user?.userId as string);
    if (responseRatings) setRatings(responseRatings.data.ratings);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="bg-gray-800 flex items-center space-x-2">
          <GoBack />
        </header>
        <div className="mt-8 flex justify-center">
          <Ratings ratings={ratings} title={"Avaliações Recebidas"} />
        </div>
      </main>
      <footer className="bg-gray-800 text-gray-400 text-center p-4 mt-12 font-[Poppins]">
        <p>Política de privacidade | Termos de uso</p>
        <p>&copy; 2023 Bluq. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default ReceivedRatings;
