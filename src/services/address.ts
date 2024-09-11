import { AddressFormState, OfferRideBody } from "@/utils/types";
import { api } from "./api";
import { toast } from "react-toastify";

export const fetchUserAddresses = async () => {
  try {
    const response = await api.get('/users/user/self/address');
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

export const deleteAddress= async (id: string) => {
  try {
    const response = await api.delete(`/users/user/self/address/${id}`);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const createAddress = async (address: AddressFormState) => {
  try {
    const response = await api.post('/users/user/self/address', address);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}