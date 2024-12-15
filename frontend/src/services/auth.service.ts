import { httpClient } from "@/libs/axios";

export const postRegister = async (data: RegisterRequestData) => {
  return await httpClient.post("register", data).then((response) => {
    return response.data;
  });
};

export const postLogin = async (data: LoginRequestData) => {
  return await httpClient.post<TokenResponseData>("login", data).then((response) => {
    return response.data;
  });
};
