import { createContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { getAllRides, getHistoryRide } from "@/services/ride";

type RideContextType = {
  rides: any;
  history: any;
};

export const RideContext = createContext({} as RideContextType);

export function RideProvider({ children }: any) {
  const [rides, setRides] = useState([] as any);
  const [history, setHistory] = useState([] as any)
  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) {
      getAllRides().then((data) => setRides(data?.data?.rides));
      getHistoryRide().then((data) => setHistory(data?.data));
    }
  }, []);

  return (
    <RideContext.Provider value={{ rides, history }}>{children}</RideContext.Provider>
  );
}
