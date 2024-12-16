import { toast } from "react-toastify";
import { api } from "./api";

export async function getReport(id: string) {
  try {
    const response = await api.get(`/reports/${id}`);
    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function getUserReportsReceived(id: string) {
  try {
    const response = await api.get(`/reports/received/user/${id}`);
    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function getUserReportsSubmitted(id: string) {
  try {
    const response = await api.get(`/reports/submitted/user/${id}`);
    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function createReport(body: any) {
  try {
    const response = await api.post("/reports", body);
    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function editReport(id: string, body: any) {
  try {
    const response = await api.put(`/reports/${id}`, body);
    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function deleteReport(id: string) {
  try {
    const response = await api.delete(`/reports/${id}`);

    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
}
