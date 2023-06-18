import { handleError } from "@/utils/handleErros";
import { api } from "./api";
import { CreateCarFormState } from "@/utils/types";

export type Car = {
  id: number;
  userId: number;
  brand: string;
  model: string;
  model_year: number;
  color: string;
  plate: string;
};

// {
//   "brand": "string",
//   "model": "string",
//   "modelYear": "2023",
//   "color": "string",
//   "plate": "KGU7E07"
// }

export async function createCar(car: CreateCarFormState) {
  try {
    const response = await api.post("/api/v1/cars", car);
    return response;
  } catch (error: any) {
    handleError(error);
  }
}

export async function getUserCars(): Promise<Car[]> {
  try {
    const response = await api.get("/api/v1/cars");
    return response.data as Car[];
  } catch (error: any) {
    handleError(error);
    throw error;
  }
}

export async function deleteCar(id: number) {
  try {
    const response = await api.delete(`/api/v1/cars/${id}`);

    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
}
