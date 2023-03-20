import axios, { AxiosResponse } from "axios";
import { Auth } from '@wellbeing/graphql-types';

const axiosClient = axios.create({
  url: 'http://localhost:3030'
});

export const AuthRequests = {
  login: async(email: string, password: string): Promise<AxiosResponse<Auth.Response>> => {
    const login = await axiosClient.post<Auth.ReqBody, AxiosResponse<Auth.Response>>('/login', {
      email,
      password,
    });
  }
}
