import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosResponse> => {
  let problemDetails = {
    title: error.message,
    detail: error.message,
  } as ProblemDetails;

  if (error.response?.data) {
    problemDetails = error?.response?.data as ProblemDetails;
  }

  return Promise.reject(problemDetails);
};

const httpClient = axios.create({
  baseURL: "http://localhost:5200",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(onRequest, onRequestError);
httpClient.interceptors.response.use(onResponse, onResponseError);

export { httpClient };
