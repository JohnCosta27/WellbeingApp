import axios, { AxiosResponse } from "axios";
import { Auth } from "@wellbeing/graphql-types";

const axiosClient = axios.create({
  baseURL: `${window.location.protocol}//${import.meta.env.VITE_BACKEND_URL}`,
  timeout: 5000,
});

export const AuthRequests = {
  login: async (body: Auth.ReqBody): Promise<AxiosResponse<Auth.Response>> => {
    return await axiosClient.post<Auth.ReqBody, AxiosResponse<Auth.Response>>(
      "/auth/login",
      body
    );
  },
  register: async (
    body: Auth.ReqBody
  ): Promise<AxiosResponse<Auth.Response>> => {
    return await axiosClient.post<Auth.ReqBody, AxiosResponse<Auth.Response>>(
      "/auth/register",
      body
    );
  },
  refresh: async (
    body: Auth.RefreshReqBody
  ): Promise<AxiosResponse<Auth.Response>> => {
    return await axiosClient.post<
      Auth.RefreshReqBody,
      AxiosResponse<Auth.Response>
    >("/auth/refresh", body);
  },
} as const;
