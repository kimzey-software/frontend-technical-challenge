import { httpApi } from '../../../../http/http-api.ts';

export const createZipCode = (payload: any) => {
  return httpApi.post('/zip-codes', { ...payload });
};
