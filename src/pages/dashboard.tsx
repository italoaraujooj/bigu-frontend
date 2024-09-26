import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Image from "next/image";

import Header from "@/components/header";
import History from "@/components/history";
import Ride from "@/components/ride";
import { AuthContext } from "@/context/AuthContext";
import Star from "../assets/star.png";
import { RequestContext } from "@/context/RequestContext";
import RidesRequests from "@/components/requestRides";
import RidesOffers from "@/components/ridesOffers";
import LottieAnimation from "@/components/LottieAnimation";
import Celebrations from "../assets/celebrations.json";
import { Text } from "@/components";
import { fakeDelay } from "@/utils/delay";
import clsx from "clsx";
import { useRouter } from "next/router";
import { getAllRidesAvailable, getRideHistory } from "@/services/ride";
import { RideResponseDTO } from "@/types/ride";

function Dashboard() {
  const router = useRouter();
  const { firstAccess: first = false } = router.query;
  const { user } = useContext(AuthContext);
  const { loading } = useContext(RequestContext);
  const [history, setHistory] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  const [showRides, setShowRides] = useState(false);
  const [firstDashboardAccess, setFirstDashboardAccess] = useState(first);
  const [ridesAvailable, setRidesAvailable] = useState<RideResponseDTO[]>([]);

  const [loadingStateRides, setLoadingStateRides] = useState<boolean>(true);
  const [loadingStateHistory, setLoadingStateHistory] = useState<boolean>(true);

  const handleCloseRequests = () => setShowRequests(false);
  const handleOpenRequests = () => setShowRequests(true);
  const handleCloseRides = () => setShowRides(false);
  const handleOpenRides = () => setShowRides(true);

  useEffect(() => {
    loadDataHistory();
    loadDataRidesAvailable();
  }, []);
  
  const loadDataHistory = async () => {
    try{
      const responseHistory = await getRideHistory();
      setHistory(responseHistory.data.userHistory);
    }finally{
      setLoadingStateHistory(false);
    }
  }

  const loadDataRidesAvailable = async () => {
    try{
      const responseAvailable = await getAllRidesAvailable();
      setRidesAvailable(responseAvailable?.data.availableRides);
    }finally{
      setLoadingStateRides(false);
    }
  }

  const renderGreeting = () => {
    return (
      <div className="flex gap-1">
        {loading ? (
          <div className="flex items-center gap-4">
            <div className="animate-pulse rounded-md bg-slate-700 h-14 w-80"></div>
            <div className="animate-pulse rounded-md bg-slate-700 h-14 w-16"></div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <h1 className="font-[Poppins] text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl mr-2">
              {`Olá, ${user?.name.split(" ")[0]}`}
            </h1>
            <div className="flex items-center gap-2 pt-2">
              <Image className="w-3 h-3" src={Star} alt="estrela" />
              <span className="text-gray text-[0.725rem]">5.0</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const [messages, setMessages] = useState([
    "Sua conta foi criada com sucesso!",
    "Viu como foi fácil?",
    "Espere um instante",
    "Tudo pronto. Seja bem-vindo!",
  ]);

  const positions = ["-0px", "-100px", "-200px", "-300px", ""];

  const [p, setP] = useState(0);

  useEffect(() => {
    async function t() {
      await fakeDelay(2000);
      setP(1);
      await fakeDelay(2000);
      setP(2);
      await fakeDelay(2000);
      setP(3);
      await fakeDelay(2000);
      setP(4);
    }

    t();
  }, []);

  useEffect(() => {
    if (p === 4) {
      setFirstDashboardAccess(false);
    }
  }, [p]);

  const firstAccess = () => {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        <div className="w-[1100px] h-28 mt-28 overflow-hidden mx-auto text-center space-y-10">
          {messages.map((ms, i) => (
            <Text
              key={i}
              label={ms}
              size="5xl"
              className={clsx(
                `transition translate-y-[${positions[p]}] ease-in-out duration-1000`,
              )}
            />
          ))}
        </div>
        <div className="flex items-center justify-center w-full h-screen absolute">
          <LottieAnimation
            data={Celebrations}
            className="top-48 w-[800px] absolute start-auto"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full my-16 max-w-[1920px] mx-auto">
      {firstDashboardAccess ? (
        firstAccess()
      ) : (
        <>
          <div className="max-w-[90%] mx-auto flex flex-col gap-9">
            <Header
              handleOpenRequests={handleOpenRequests}
              handleOpenRides={handleOpenRides}
            />
            <div className="flex justify-between items-center">
              {renderGreeting()}
            </div>
            <div className="flex flex-col-reverse justify-between gap-2 sm:gap-12 lg:gap-12 lg:flex-row">
              <History races={history} loading={loadingStateHistory} />
              <div className="border-solid border-[1px] border-warmGray-700"></div>
              <Ride ridesAvailable={ridesAvailable} loadDataRidesAvailable={loadDataRidesAvailable} loading={loadingStateRides}/>
            </div>
          </div>
          <RidesRequests
            handleClose={handleCloseRequests}
            visible={showRequests}
          />
          <RidesOffers handleClose={handleCloseRides} visible={showRides} loadDataRidesAvailable={loadDataRidesAvailable}/>
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "nextauth.accessToken": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;
