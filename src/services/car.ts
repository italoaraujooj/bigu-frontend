import { api } from "./api";
import { CreateCarFormState } from "@/utils/types";
import { toast } from "react-toastify";

export type Car = {
  id: number;
  brand: string;
  carModel: string;
  modelYear: number;
  color: string;
  plate: string;
};

export async function getUserCars(){
  try {
    const response = await api.get("/users/user/self/car");
    return response;
  } catch (error: any) {
    toast.error(error.message)
  }
}

export async function createCar(car: CreateCarFormState) {
  try {
    const response = await api.post("users/user/self/car", car);
    return response;
  } catch (error: any) {
    toast.error(error.message)
  }
}

export async function getAllCars(){
  try {
    const response = await api.get("/users/user/self/car");
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
