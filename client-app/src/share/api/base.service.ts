import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = 'https://localhost:5001/api';

export const baseConfig: AxiosRequestConfig = {
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
};

export type method =
  | 'GET'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'PURGE'
  | 'LINK'
  | 'UNLINK'
  | undefined;

export const request = (
  url: string,
  method: method,
  data?: unknown,
  { ...customConfig }: AxiosRequestConfig = baseConfig,
): Promise<any> => {
  const config: AxiosRequestConfig = {
    url: url,
    method: method,
    ...customConfig,
    headers: {
      ...customConfig.headers,
    },
  };

  if (data) {
    config.data = JSON.stringify(data);
  }

  return axios(config);
};

export default request;
