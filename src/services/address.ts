import { OfferRideBody } from "@/utils/types";
import { api } from "./api";

export const fetchUserAddresses = async () => {
  try {
    const response = await api.get('/api/v1/addresses');
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export const fetchUfcgAddresses = async () => {
  try {
    const response = await api.get('/api/v1/addresses/get-ufcg');
    return response;
  } catch (err) {
    console.log(err);
  }
}
