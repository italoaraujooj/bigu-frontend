import { createContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { getHistoryRide, getAllRidesAvailable } from "@/services/ride";
import { Car, getUserCars } from "@/services/car";

type RideContextType = {
  rides: any;
  history: any;
  cars: any;
};

export const RideContext = createContext({} as RideContextType);

export function RideProvider({ children }: any) {
  const [rides, setRides] = useState([] as any);
  const [history, setHistory] = useState([] as any);
  const [cars, setCars] = useState<Car[]>([]);

  const { "nextauth.token": token } = parseCookies();
  useEffect(() => {
    if (token) {
      console.log('caiu')
      getAllRidesAvailable().then((data) =>setRides(data?.data));
      getHistoryRide().then((data) => setHistory(data?.data));
    }
  }, [token]);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) {
      const loadData = async () => {
        getUserCars().then((response) => {
          setCars(response);
        });
      };
      loadData();
    }
  }, [token]);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) {
      console.log('caiu')
      getAllRidesAvailable().then((data) =>setRides(data?.data));
      getHistoryRide().then((data) => setHistory(data?.data));
    }
  }, []);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) {
      const loadData = async () => {
        getUserCars().then((response) => {
          setCars(response);
        });
      };
      loadData();
    }
  }, []);

  return (
    <RideContext.Provider value={{ rides, history, cars }}>{children}</RideContext.Provider>
  );
}
