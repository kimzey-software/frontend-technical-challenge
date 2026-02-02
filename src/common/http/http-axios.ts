import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export abstract class HttpAxios {
  service: AxiosInstance;
  protected constructor(config: AxiosRequestConfig) {
    const service = axios.create(config);
    service.defaults.withCredentials = false;
    this.service = service;
    this.configureInterceptors();
  }

  abstract configureInterceptors(): void;

  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.service.get<T>(path, config);
    return response.data;
  }

  async patch<T>(
    path: string,
    payload: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.service.patch<T>(path, payload, config);
    return response.data;
  }

  async post<T>(
    path: string,
    payload: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.service.post<T>(path, payload, config);
    return response.data;
  }

  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.service.delete<T>(path, config);
    return response.data;
  }
}
