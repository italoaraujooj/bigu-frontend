import { handleError } from "@/utils/handleErros";
import { api } from "./api";
import { ChangePassword, SignInResponse } from "@/utils/types";

import { toast } from "react-toastify";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import router from "next/router";

type UserFormState = {
    name:string,
    email:string,
    matricula: string,
    phoneNumber:string,
    sex: string,
    password:string
}

type SignInRequestData = {
    email:string;
    password:string
}

export async function signUpRequest(credentials: UserFormState) {
  try{
    return await api.post('/auth/register/user', credentials);
  }catch (error: any){
    toast.error(error.message)
  }
}

export async function signInRequest(credentials: SignInRequestData){
  try{
    return await api.post('auth/login/user', credentials);
  }catch (error: any){
    toast.error(error.message)
  }
}

export async function logOut(){
  try{
    await api.post('auth/logout')
    destroyCookie(null, "nextauth.accessToken");
    destroyCookie(null, "nextauth.refreshToken");
    router.push("/");
  }catch (error: any){
    toast.error(error.message)
  }
}

export async function getUser(){
  return await api.get('/users/user')
}

export async function forgotPasswordRequest(email: string){
  try{
    const res = await api.post('/auth/request-password-reset', {email: email});
    return res;
  }catch (error: any){
    toast.error(error.message)
  }
}

export async function changePasswordRequest(credentials: ChangePassword){
  try{
    return await api.put(`/api/v1/auth/edit-password?actualPassword=${credentials.actualPassword}`, credentials)
  }catch(error: any){
    toast.error(error.message)
  }
}

export const refreshToken = async () => {
  try {
    const { "nextauth.refreshToken": token } = parseCookies();
    const response = await api.post('/auth/refresh', {"refreshToken": token});
    if (response && response.status === 200) {
      setCookie(undefined, "nextauth.accessToken", response.data.newAccessToken);
    }
  } catch (error) {
    toast.error("Erro ao renovar token");
  }
};

export const profilePicture = async (formData: FormData) => {
  try{
    return await api.post('/users/upload-profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }catch(error){
    toast.error("Erro ao atualizar a foto de perfil.");
  }
}

export async function getUserById(id: string){
  return await api.get(`/users/id/${id}`)
}

export async function verifyCode(email: string, code: string){
  try{
    return await api.put(`/auth/validate-code/${email}/${code}`)
  }catch(error: any){
    toast.error(error.message);
  }
}


