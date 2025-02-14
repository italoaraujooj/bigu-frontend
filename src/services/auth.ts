import { ChangePassword } from "@/utils/types";
import { api } from "./api";

import router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { toast } from "react-toastify";
import { evaluateBody } from "@/types/types";

type UserFormState = {
  name: string,
  email: string,
  matricula: string,
  phoneNumber: string,
  sex: string,
  password: string
}

type SignInRequestData = {
  email: string;
  password: string
}

export async function signUpRequest(credentials: UserFormState) {
  try {
    return await api.post('/auth/register/user', credentials);
  } catch (error: any) {
    toast.error(error.message)
  }
}

export async function signInRequest(credentials: SignInRequestData) {
  try {
    return await api.post('auth/login/user', credentials);
  } catch (error: any) {
    toast.error(error.message)
  }
}

export async function logOut() {
  try {
    await api.post('auth/logout')
    destroyCookie(null, "nextauth.accessToken");
    destroyCookie(null, "nextauth.refreshToken");
    router.push("/");
  } catch (error: any) {
    toast.error(error.message)
  }
}

export async function getUser() {
  return await api.get('/users/user')
}

export async function forgotPasswordRequest(email: string) {
  try {
    const res = await api.post('/auth/request-password-reset', { email: email });
    return res;
  } catch (error: any) {
    toast.error(error.message)
  }
}

export async function changePasswordRequest(credentials: ChangePassword) {
  try {
    const { newPassword } = credentials
    return await api.put(`/auth/reset-password/${credentials.email}`, { password: newPassword })
  } catch (error: any) {
    toast.error(error.message)
  }
}

export const refreshToken = async () => {
  try {
    const { "nextauth.refreshToken": token } = parseCookies();
    const response = await api.post('/auth/refresh', { "refreshToken": token });
    if (response && response.status === 200) {
      setCookie(undefined, "nextauth.accessToken", response.data.newAccessToken);
    }
  } catch (err: any) {
    console.log(err);
    toast.error(err.message);
  }
};

export const profilePicture = async (formData: FormData) => {
  try {
    return await api.post('/users/upload-profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err: any) {
    console.log(err);
    toast.error(err.message);
  }
}

export const postDocumentPicture = async (formData: FormData) => {
  try {
    return await api.post('/users/upload-id-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err: any) {
    console.log(err);
    toast.error(err.message);
  }
}

export async function getIdPhotoUserById(id: string) {
  return await api.get(`/users/id-photo/${id}`)
}

export async function getUserById(id: string) {
  return await api.get(`/users/id/${id}`)
}

export async function verifyCode(code: string) {
  try {
    return await api.put(`/auth/confirm/user/${code}`)
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function getUserWithDocumentStatusInReview(){
  try {
    return await api.get(`/users/inReview`);
  } catch (error: any) {
    toast.error(error.message);
  } 
}

export async function evaluateUserDocument(userId: string, body: evaluateBody){
  try {
    return await api.put(`/users/evaluate-document/${userId}`, body);
  } catch (error: any) {
    toast.error(error.message);
  } 
}
