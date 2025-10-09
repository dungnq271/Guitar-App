import axios from "axios";
import { type Guitar } from "./models";
// import { axiosInstance as axios } from "../lib/axiosInterceptor";

axios.defaults.withCredentials = true;
const baseURL = import.meta.env.VITE_BACKEND_URL;

export async function fetchGuitars() {
  const response = await axios.get(baseURL + `/guitar/list`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.data as Guitar[];
}

export async function login(data: object) {
  const response = await axios.post(baseURL + "/auth/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function register(data: object) {
  const response = await axios.post(baseURL + "/auth/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function refreshJwt(
  refreshToken: string,
  fingerprintHash: string,
) {
  const response = await axios.post(
    baseURL + "/auth/refresh-token",
    {
      fingerprintHash,
      refreshToken,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
}
