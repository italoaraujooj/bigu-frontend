import { createContext, useContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import {
  getHistoryRide,
  getAllRidesAvailable,
  createRide,
  getCandidates,
} from "@/services/ride";
import { Car, getUserCars } from "@/services/car";
import { AuthContext } from "./AuthContext";
import { fetchUserAddresses } from "@/services/address";

type RideContextType = {
  rides: any;
  history: any;
  cars: any;
  setCars: any;
  userAddress: any;
  setRides: any;
  ridesUser: any[];
  setRidesUser: any;
};

export const RideContext = createContext({} as RideContextType);

export function RideProvider({ children }: any) {
  const [rides, setRides] = useState([] as any);
  const [history, setHistory] = useState([] as any);
  const [cars, setCars] = useState<Car[]>([]);
  const [userAddress, setUserAddress] = useState([]);
  const [ridesUser, setRidesUser] = useState([]);

  const { "nextauth.token": token } = parseCookies();
  useEffect(() => {
    if (token) {
      getAllRidesAvailable().then((data) => setRides(data?.data));
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
        fetchUserAddresses().then((response) => {
          console.log(response);
          setUserAddress(response?.data);
        });
      };
      loadData();
    }
  }, [token]);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) {
      getAllRidesAvailable().then((data) => setRides(data?.data));
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
        fetchUserAddresses().then((response) => {
          console.log(response);
          setUserAddress(response?.data);
        });
      };
      loadData();
    }
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      console.log("entrei aqui");
      getCandidates().then((data) => {
        console.log('!!!!!!!!!!!!!!!!!!')
        console.log(data);
        setRidesUser(data?.data);
      });
    }

  }, [rides]);

  // useEffect(() => {
  //   const { "nextauth.token": token } = parseCookies();
  //   if (token) {
  //     const loadData = async () => {
  //       fetchUserAddresses().then((response) => {
  //         console.log(response)
  //         setUserAddress(response?.data);
  //       });
  //     };
  //     loadData();
  //   }
  // }, []);

  return (
    <RideContext.Provider
      value={{
        rides,
        history,
        cars,
        setCars,
        userAddress,
        setRides,
        ridesUser,
        setRidesUser,
      }}
    >
      {children}
    </RideContext.Provider>
  );
}
