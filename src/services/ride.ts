import { OfferRideBody } from "@/utils/types";
import { api } from "./api";
import { toast } from "react-toastify";
import { RideDto } from "@/types/ride";

export const getAllRides = async () => {
  try {
    const response = api.get('/rides');
    
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const getRideHistory = async () => {
  try {
    const response: any = api.get('/rides/user/history');
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}


export const createRide = async (body: RideDto) => {
  try {
    const response = api.post('rides', body);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const getAllRidesAvailable = async () => {
  try {
    const response = api.get('/rides/available');
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const requestRide = async (body: any) => {
  try {
    const response = api.put('/api/v1/rides/request-ride', body);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const getCandidates = async () => {
  try{
    return api.get("/api/v1/rides/candidates")
  }catch(err: any){
    toast.error(err.message)
  }
}

export const answerCandidate = async (body: any) => {
  try{
    const response =  api.put("/api/v1/rides/answer-candidate", body)
    return response;
  }catch(err: any){
    toast.error(err.message)
  }
}

export const deleteRide = async (id: number) => {
  try {
    const response = api.delete(`/rides/ride/${id}`);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const getMyRidesAvailable = async () => {
  try {
    const response = api.get('/rides/driver/active');
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}