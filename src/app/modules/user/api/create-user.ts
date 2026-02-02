import { httpApi } from '../../../http/http-api.ts';

export const createUser = <T>(name: string): Promise<T> => {
  return httpApi.post<T>('/zip-codes/user', { name: name });
};
