import axios from "axios";
import router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { refreshToken } from "./auth";


const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://bigu-backend-nest.fly.dev";

export const api = axios.create({
  baseURL,
  headers: { 'Accept': 'application/json' }
});

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const { data } = error.response;

      if (data.message === "Credenciais inválidas." || data.message === "Email não cadastrado.") {
        throw new Error(data.message);
      } else if (data.message === "Refresh token inválido" || data.message === "Token inválido ou expirado") {
        destroyCookie(null, "nextauth.accessToken");
        destroyCookie(null, "nextauth.refreshToken");
        await router.push("/");
        return Promise.reject(error);
      }

      if (!originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            await refreshToken();
            const { 'nextauth.accessToken': newToken } = parseCookies();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            processQueue(null, newToken);
            resolve(axios(originalRequest));
          } catch (err) {
            processQueue(err, null);
            reject(err);
          } finally {
            isRefreshing = false;
          }
        });
      }
    }

    return Promise.reject(error.response.data);
  }
);


api.interceptors.request.use(config => {
  const { 'nextauth.accessToken': token } = parseCookies();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config
})


