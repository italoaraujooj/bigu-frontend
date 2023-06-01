import { OfferRideBody } from "@/utils/types";
import { api } from "./api";

export const getAllRides = async () => {
  try {
    const response = api.get('/api/v1/rides');
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

const offerRide = async (data: OfferRideBody) => {
  try {
    const response = api.post('/api/v1/rides', data);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

const getRideById = async (id: number) => {
  try {
    const response = api.get(`/api/v1/rides/${id}`);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

const getMember = async () => {
  try {
    const response = api.get('/api/v1/rides');
    console.log(response);
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