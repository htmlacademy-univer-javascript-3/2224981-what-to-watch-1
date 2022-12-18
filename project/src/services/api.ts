import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getToken} from './token';
import {handleError} from './handle-error';

const BACKEND_URL = 'https://10.react.pages.academy/wtw';
const TIMEOUT = 5000;

export const createApi = () => {
  const api = axios.create(
    {
      baseURL: BACKEND_URL,
      timeout: TIMEOUT
    }
  );

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (res: AxiosResponse) => res,
    (error:AxiosError<{error: string}>) => {
      if (error.response) {
        handleError(error.response.data.error);
      }
    }
  );

  return api;
};
