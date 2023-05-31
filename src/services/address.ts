import { OfferRideBody } from "@/utils/types";
import { api } from "./api";

export const fetchUserAddresses = async () => {
  try {
    const response = api.get('/api/v1/address');
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

