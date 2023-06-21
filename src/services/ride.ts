import { OfferRideBody } from "@/utils/types";
import { api } from "./api";

export const getAllRides = async () => {
  try {
    const response = api.get('/api/v1/rides');
    
    return response;
  } catch (err) {
    console.log(err);
  }
}

export const getHistoryRide = async () => {
  try {
    const response: any = api.get('/api/v1/rides/history');
    
    return response;
  } catch (err) {
    console.log(err);
  }
}

const offerRide = async (data: OfferRideBody) => {
  try {
    const response = api.post('/api/v1/rides', data);
  } catch (err) {
    console.log(err);
  }
}

const getRideById = async (id: number) => {
  try {
    const response = api.get(`/api/v1/rides/${id}`);
  } catch (err) {
    console.log(err);
  }
}

const getMember = async () => {
  try {
    const response = api.get('/api/v1/rides');
  } catch (err) {
    console.log(err);
  }
}

export const createRide = async (body: any) => {
  try {
    const response = api.post('/api/v1/rides', body);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export const getAllRidesAvailable = async () => {
  try {
    const response = api.get('/api/v1/rides/available');
    return response;
  } catch (err) {
    console.log(err);
  }
}

export const requestRide = async (body: any) => {
  try {
    const response = api.put('/api/v1/rides/request-ride', body);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export const getCandidates = async () => {
  try{
    return api.get("/api/v1/rides/candidates")
  }catch(err){
    console.log(err)
  }
}

export const answerCandidate = async (body: any) => {
  try{
    const response =  api.put("/api/v1/rides/answer-candidate", body)
    return response;
  }catch(err){
    console.log(err)
  }
}

export const deleteRide = async (id: number) => {
  try {
    const response = api.delete(`/api/v1/rides/delete-ride/${id}`);
    return response;
  } catch (err) {
    console.log(err);
  }
}