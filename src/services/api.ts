import axios from "axios";
import { getCookie } from "cookies-next";
import { parseCookies } from "nookies";

export const api = axios.create({
  baseURL: 'http://localhost:8080',
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

