import { api } from "./api";
import { CreateCarFormState } from "@/utils/types";
import { toast } from "react-toastify";

export type Car = {
  carId: string;
  brand: string;
  carModel: string;
  modelYear: number;
  color: string;
  plate: string;
};

export async function getUserCars(){
  try {
    const response = await api.get("/cars/user/cars");
    return response;
  } catch (error: any) {
    toast.error(error.message)
  }
}

export async function createCar(car: CreateCarFormState) {
  try {
    const response = await api.post("/cars", car);
    return response;
  } catch (error: any) {
    toast.error(error.message)
  }
}

export async function getAllCars(){
  try {
    const response = await api.get("/cars");
    return response.data as Car[];
  } catch (error: any) {
    toast.error(error.message)
  }
}

export async function deleteCar(id: number) {
  try {
    const response = await api.delete(`/cars/${id}`);

    return response.data;
  } catch (error: any) {
    toast.error(error.message)
  }
}
