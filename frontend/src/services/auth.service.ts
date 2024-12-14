import { httpClient } from "@/libs/axios";

export const register = async (data: RegisterFormData) => {
  return await httpClient.post("register", data).then((response) => {
    return response.data;
  });
};
