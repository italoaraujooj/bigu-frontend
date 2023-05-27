import { handleError } from "@/utils/handleErros";
import { api } from "./api";

type SignUpRequestData = {
    fullName:string,
    email:string,
    phoneNumber:string,
    password:string
}

type SignInRequestData = {
    email:string;
    password:string
}

type Token = {
    token: String;
}

export async function signUpRequest(credentials: SignUpRequestData) {
  try{
    return api.post('/api/v1/auth/register', credentials);
  }catch (error: any){
    handleError(error);
  }
}

export function signInRequest(credentials: SignInRequestData){
  try{
    return api.post('/api/v1/auth/authenticate', credentials)
  }catch (error: any){
    handleError(error);
  }
}

export function logOut( credentials: Token){
  try{
    return api.post('/api/v1/auth/logout', credentials)
  }catch (error: any){
    handleError(error)
  }
}

export function getUser(){
  const token = localStorage.getItem("bigu-token")
  return api.get('/api/v1/users/self',)
}

