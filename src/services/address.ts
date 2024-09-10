import { AddressFormState, OfferRideBody } from "@/utils/types";
import { api } from "./api";
import { toast } from "react-toastify";

export const fetchUserAddresses = async () => {
  try {
    const response = await api.get('/api/v1/addresses');
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const fetchUfcgAddresses = async () => {
  try {
    const response = await api.get('/api/v1/addresses/get-ufcg');
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const deleteAddress= async (id: number) => {
  try {
    const response = await api.delete(`/api/v1/addresses?addressId=${id}`);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const createAddress = async (address: AddressFormState) => {
  try {
    const response = await api.post('/api/v1/addresses', address);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}