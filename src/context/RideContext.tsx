import { createContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { getAllRides } from "@/services/ride";

type RideContextType = {
  rides: any;
};

export const RideContext = createContext({} as RideContextType);

export function RideProvider({ children }: any) {
  const [rides, setRides] = useState(null as any);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) {
      getAllRides().then((data) => setRides(data?.data?.rides));
    }
  }, []);

  return (
    <RideContext.Provider value={{ rides }}>{children}</RideContext.Provider>
  );
}
