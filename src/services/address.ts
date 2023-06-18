import { AddressFormState, OfferRideBody } from "@/utils/types";
import { api } from "./api";

export const fetchUserAddresses = async () => {
  try {
    const response = await api.get('/api/v1/addresses');
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

export const deleteAddress= async (id: number) => {
  try {
    const response = await api.delete(`/api/v1/addresses?addressId=${id}`);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export const createAddress = async (address: AddressFormState) => {
  try {
    const response = await api.post('/api/v1/addresses', address);
    return response;
  } catch (err) {
    console.log(err);
  }
}