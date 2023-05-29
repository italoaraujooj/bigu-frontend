import { handleError } from "@/utils/handleErros";
import { api } from "./api";

type Car = {
    id:number,
    userId:number,
    brand:string,
    model:string,
    model_year:number,
    color:string,
    plate:string
}


type Token = {
    token: String;
}

export async function createCar(car: Car) {
    const token = localStorage.getItem("bigu-token")
  try{
    const response = await api.post('/api/v1/cars', car, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data as Car;

    }catch (error: any){
    handleError(error);
  }
}

export async function getUserCars(): Promise<Car[]> {
    const token = localStorage.getItem('bigu-token');

    try {
        const response = await api.get('/api/v1/cars', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data as Car[];
    } catch (error: any) {
        handleError(error);
        throw error;
    }
}

export async function deleteCar(id: number) {
    const token = localStorage.getItem('bigu-token');

    try {
        const response = await api.delete(`/api/v1/cars/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        handleError(error);
        throw error;
    }
}