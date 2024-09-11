import { OfferRideBody } from "@/utils/types";
import { api } from "./api";
import { toast } from "react-toastify";

export const getAllRides = async () => {
  try {
    const response = api.get('/rides');
    
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const getHistoryRide = async () => {
  try {
    const response: any = api.get('/users/user/self/history');
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

const offerRide = async (data: OfferRideBody) => {
  try {
    const response = api.post('/api/v1/rides', data);
  } catch (err: any) {
    toast.error(err.message)
  }
}

const getRideById = async (id: number) => {
  try {
    const response = api.get(`/ride/${id}`);
  } catch (err: any) {
    toast.error(err.message)
  }
}

const getMember = async () => {
  try {
    const response = api.get('/api/v1/rides');
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const createRide = async (body: any) => {
  try {
    const response = api.post('ride', body);
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
    const response = api.get('/rides/driver');
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}