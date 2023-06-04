import axios from "axios";
import { getCookie } from "cookies-next";
import { parseCookies } from "nookies";

const baseURL = process.env.API_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: 'http://bigu-backend.herokuapp.com',
  headers: {'Accept': 'application/json'}
});

// let token;
// if (typeof window !== 'undefined') {
//   // Perform localStorage action
//   // token = localStorage.getItem("bigu-token")

//   token = token ? getCookie("token") : null;
// }


api.interceptors.request.use( config => {
  const { 'nextauth.token': token } = parseCookies();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})

