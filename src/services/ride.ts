import { OfferRideBody } from "@/utils/types";
import { api } from "./api";
import { toast } from "react-toastify";
import { RequestRide, RideDto } from "@/types/ride";

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

export const getRide = async (id: string) => {
  try {
    const response: any = api.get(`/rides/ride/${id}`);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const createRide = async (body: any) => {
  try {
    const response = api.post('rides', body);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const editRide = async (id: string, body: any) => {
  try {
    const response = api.patch(`rides/ride/${id}`, body);
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

export const requestRide = async (params: RequestRide) => {
  try {
    const response = api.put(`/rides/request/${params.rideId}/${params.addressId}`);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const getCandidates = async () => {
  try{
    return api.get("rides/candidates")
  }catch(err: any){
    toast.error(err.message)
  }
}

export const answerCandidate = async (body: any, rideId: string, candidateId: string) => {
  try{
    const response =  api.put(`/rides/answer/${rideId}/candidate/${candidateId}`, body)
    return response;
  }catch(err: any){
    toast.error(err.message)
  }
}

export const deleteRide = async (id: string) => {
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

export const getAllRidesActive = async () => {
  try {
    const response = api.get('/rides/active');
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const getAllRidesActiveToWomen = async () => {
  try {
    const response = api.get('/rides/active/toWomen');
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const getAllRidesAvailableToWomen = async () => {
  try {
    const response = api.get('/rides/available/toWomen');
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}


export const setOverRide = async (rideId: string) => {
  try {
    const response = api.put(`/rides/over/${rideId}`);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}