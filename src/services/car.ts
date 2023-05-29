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
    return api.post('/api/v1/cars', car);
  }catch (error: any){
    handleError(error);
  }
}