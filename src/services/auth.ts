import { api } from "./api";

type CredentialsRegister = {
    fullName:string,
    email:string,
    phoneNumber:string,
    password:string
}

type CredentialsLogin = {
    email:string;
    password:string
}

export async function signUp(credentials: CredentialsRegister) {
  return api.post('/api/v1/auth/register', credentials);
}

export function signIn(credentials: CredentialsLogin){
  return api.post('/api/v1/auth/authenticate', credentials)
}

export function getUser(){
  const token = localStorage.getItem("bigu-token")
  return api.get('/api/v1/users/', {
    headers: {
      'Authorization': `Bearer${token}`
    }  
  })
}

