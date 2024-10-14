import { api } from "./api";
import { toast } from "react-toastify";

export const getUserRatings = async (id: string) => {
  try {
    const response: any = api.get(`ratings/user/${id}`);
    return response;
  } catch (err: any) {
    toast.error(err.message)
  }
}