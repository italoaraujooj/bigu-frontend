import { CreateCarFormState } from "@/utils/types";
import { toast } from "react-toastify";
import { api } from "./api";

export type Car = {
  vehicleId: string;
  brand: string;
  vehicleModel: string;
  modelYear: number;
  color: string;
  plate: string;
  type: "CAR" | "MOTORCYCLE"
};

export async function getUserCars() {
  try {
    const response = await api.get("/Vehicles/user/vehicles");
    return response;
  } catch (error: any) {
    toast.error(error.message)
  }
}

export async function createCar(car: CreateCarFormState) {
  try {
    const response = await api.post("/Vehicles", car);
    return response;
  } catch (error: any) {
    toast.error(error.message)
  }
}

export async function getAllCars() {
  try {
    const response = await api.get("/Vehicles");
    return response.data as Car[];
  } catch (error: any) {
    toast.error(error.message)
  }
}

export async function deleteCar(id: string) {
  try {
    const response = await api.delete(`/Vehicles/${id}`);

    return response.data;
  } catch (error: any) {
    toast.error(error.message)
  }
}
