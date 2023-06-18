import { handleError } from "@/utils/handleErros";
import { api } from "./api";
import axios, { AxiosResponse } from "axios";
import { ChangePassword, SignInResponse } from "@/utils/types";

type SignUpRequestData = {
    fullName:string,
    email:string,
    phoneNumber:string,
    sex: string,
    password:string
}

type SignInRequestData = {
    email:string;
    password:string
}

export async function signUpRequest(credentials: SignUpRequestData) {
  try{
    return api.post('/api/v1/auth/register', credentials);
  }catch (error: any){
    handleError(error);
  }
}

export async function signInRequest(credentials: SignInRequestData){
  try{
    return await api.post('/api/v1/auth/authenticate', credentials)
  }catch (error: any){
    handleError(error);
  }
}

export async function logOut(){
  try{
    await api.post('/api/v1/auth/logout')
  }catch (error: any){
    handleError(error)
  }
}

export async function getUser(){
  return await api.get('/api/v1/users/self')
}

export async function forgotPasswordRequest(email: string){
  try{
    const res = await api.post('/api/v1/auth/forgot-password', {email});
    return res;
  }catch (error: any){
    handleError(error)
  }
}

export async function changePasswordRequest(credentials: ChangePassword){
  try{
    console.log(credentials)
    return await api.put(`/api/v1/auth/edit-password?actualPassword=${credentials.actualPassword}`, credentials)
  }catch(error: any){
    handleError(error)
  }
}


