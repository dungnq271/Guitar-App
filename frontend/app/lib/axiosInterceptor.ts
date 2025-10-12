import axios from "axios";
import { type AxiosResponse } from "axios";
import { getJwt, getRefreshToken } from "./auth";
import { refreshJwt } from "~/utils/apis";
// import { jwtDecode, type JwtPayload } from "jwt-decode";
import { parseJwt } from "./auth";

export const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    console.log(response.status);
    if (response.status === 401) {
      try {
        const jwt = getJwt();

        if (!jwt) {
          console.log("no jwt");
          return axiosInstance(response.config);
        }

        const claims = parseJwt(jwt);
        console.log("Jwt payload: ", claims);

        const refreshToken = getRefreshToken() || "";
        const fingerprintHash = claims?.["X-User-Fingerprint"];
        await refreshJwt(refreshToken, fingerprintHash);

        return axiosInstance(response.config);
      } catch (error) {
        console.log(error);
      }
    }

    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);
