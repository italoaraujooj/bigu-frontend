import { AddressFormState, OfferRideBody } from "@/utils/types";
import { api } from "./api";
import { toast } from "react-toastify";

export const fetchUserAddresses = async () => {
  try {
    const response = await api.get('addresses/user/addresses');
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const deleteAddress= async (id: string) => {
  try {
    const response = await api.delete(`/addresses/${id}`);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}

export const createAddress = async (address: AddressFormState) => {
  try {
    const response = await api.post('/addresses', address);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}