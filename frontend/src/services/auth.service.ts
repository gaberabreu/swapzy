import { httpClient } from "@/libs/axios";

export const register = async (data: RegisterFormData) => {
  console.log("registerapi");
  return await httpClient.post("register", data).then((response) => {
    return response.data;
  });
};
