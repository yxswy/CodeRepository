import axios, { AxiosError, AxiosInstance } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/",
  timeout: 7000,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (!config.headers) config.headers = {};

    return config;
  }
);

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
});

export function server<T = any>(config: AxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    axiosInstance
      .request<AxiosResponse<T>>(config)
      .then((res: AxiosResponse<AxiosResponse<T>>) => {
        resolve(res as unknown as Promise<T>);
      })
      .catch((e: Error | AxiosError) => {
        reject(e);
      });
  });
}

export default axiosInstance;
