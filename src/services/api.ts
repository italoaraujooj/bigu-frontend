import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {'Accept': 'application/json'}
});

let token;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  token = localStorage.getItem("bigu-token")
}


api.interceptors.request.use( config => {
  console.log(config);

  return config
})

if(token){
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}