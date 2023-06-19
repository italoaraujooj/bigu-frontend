import { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Image from "next/image";

import Header from "@/components/header";
import History from "@/components/history";
import Ride from "@/components/ride";
import { AuthContext } from "@/context/AuthContext";
import { RideContext } from "@/context/RideContext";
import Star from "../assets/star.png";
import { RequestContext } from "@/context/RequestContext";
import RidesRequests from "@/components/requestRides";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const { history } = useContext(RideContext);
  const { loading } = useContext(RequestContext);

  const [showRequests, setShowRequests] = useState(false);

  const handleCloseRequests = () => setShowRequests(false);
  const handleOpenRequests = () => setShowRequests(true);

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
            <h1 className="text-xl font-bold text-white md:text-4xl mr-2">
              {`Olá, ${user?.fullName}`}
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

  return (
    <div className="relative w-full my-16">
      <div className="max-w-[80%] mx-auto flex flex-col gap-9">
        <Header handleOpenRequests={handleOpenRequests} />
        <div className="flex justify-between items-center">
          {renderGreeting()}
        </div>
        <div className="flex flex-col justify-between gap-2 sm:gap-12 lg:gap-12 lg:flex-row">
          <History races={history} />
          <div className="border-solid border-[1px] border-warmGray-700"></div>
          <Ride/>
        </div>
      </div>
      <RidesRequests handleClose={handleCloseRequests} visible={showRequests} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "nextauth.token": token } = parseCookies(ctx);

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
