import { createContext, useContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { getHistoryRide, getAllRidesAvailable, createRide } from "@/services/ride";
import { Car, getUserCars } from "@/services/car";
import { AuthContext } from "./AuthContext";
import { fetchUserAddresses } from "@/services/address";

type RideContextType = {
  rides: any;
  history: any;
  cars: any;
  setCars: any;
  setRides: any;
  address: any;
  setAddress: any;
};

export const RideContext = createContext({} as RideContextType);

export function RideProvider({ children }: any) {
  const [rides, setRides] = useState([] as any);
  const [history, setHistory] = useState([] as any);
  const [cars, setCars] = useState<Car[]>([]);
  const [address, setAddress] = useState([] as any)

  const { "nextauth.token": token } = parseCookies();
  useEffect(() => {
    if (token) {
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
    <RideContext.Provider value={{ rides, history, cars, setCars, setRides, address, setAddress }}>{children}</RideContext.Provider>
  );
}
