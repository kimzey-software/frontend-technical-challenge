import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useStatusCode } from './status-code.ts';
const { statusCode } = useStatusCode();

const handleErrors = (error: AxiosError): Promise => {
  if (error.response) {
    const status = error.response.status;
    let message = '';
    switch (status) {
      case 404:
        message = 'Not Found';
        break;
      default:
        message = error.message;
    }
    statusCode.value = status;
    console.log('Error occured: ', message);
  }
  // return Promise.reject(error);
};

export const errorInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(undefined, handleErrors);
};
