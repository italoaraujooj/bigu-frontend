import { handleError } from "@/utils/handleErros";
import { api } from "./api";
import { ChangePassword, SignInResponse } from "@/utils/types";

import { toast } from "react-toastify";

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
    await api.post('/api/v1/auth/logout')
  }catch (error: any){
    toast.error(error.message)
  }
}

export async function getUser(){
  return await api.get('/users/user/self')
}

export async function forgotPasswordRequest(email: string){
  try{
    const res = await api.post('/api/v1/auth/forgot-password', {email});
    return res;
  }catch (error: any){
    toast.error(error.message)
  }
}

export async function changePasswordRequest(credentials: ChangePassword){
  try{
    console.log(credentials)
    return await api.put(`/api/v1/auth/edit-password?actualPassword=${credentials.actualPassword}`, credentials)
  }catch(error: any){
    toast.error(error.message)
  }
}


