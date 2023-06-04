import axios, { AxiosResponse } from "axios";
import { Auth } from "@wellbeing/graphql-types";

const axiosClient = axios.create({
  baseURL: `${window.location.protocol}//${import.meta.env.VITE_BACKEND_URL}`,
  timeout: 5000,
});

export const AuthRequests = {
  async login(body: Auth.ReqBody): Promise<AxiosResponse<Auth.Response>> {
    return axiosClient.post<Auth.ReqBody, AxiosResponse<Auth.Response>>(
      "/auth/login",
      body
    );
  },
  async register(body: Auth.ReqBody): Promise<AxiosResponse<Auth.Response>> {
    return axiosClient.post<Auth.ReqBody, AxiosResponse<Auth.Response>>(
      "/auth/register",
      body
    );
  },
  async refresh(
    body: Auth.RefreshReqBody
  ): Promise<AxiosResponse<Auth.Response>> {
    return axiosClient.post<Auth.RefreshReqBody, AxiosResponse<Auth.Response>>(
      "/auth/refresh",
      body
    );
  },
} as const;
