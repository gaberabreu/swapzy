import { httpClient } from "@/libs/axios";

export const postRegister = async (data: RegisterRequestData): Promise<void> => {
  return await httpClient.post("register", data).then((response) => {
    return response.data;
  });
};

export const postLogin = async (data: LoginRequestData): Promise<TokenResponseData> => {
  return await httpClient.post<TokenResponseData>("login", data).then((response) => {
    return response.data;
  });
};
