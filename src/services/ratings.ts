import { api } from "./api";
import { toast } from "react-toastify";

export const getUserRatings = async (id: string) => {
  try {
    const response: any = api.get(`ratings/user/${id}`);
    return response;
  } catch (err: any) {
    toast.error(err.message);
  }
};

export const getRating = async (id: string) => {
  try {
    const response: any = api.get(`ratings/${id}`);
    return response;
  } catch (err: any) {
    toast.error(err.message);
  }
};

export async function createRating(body: any) {
  try {
    console.log(body);
    const response = await api.post("/ratings", body);
    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function editRating(id: string, body: any) {
  try {
    const response = await api.put(`/ratings/${id}`, body);
    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function deleteRating(id: string) {
  try {
    const response = await api.delete(`/ratings/${id}`);

    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
}
