import { httpApi } from '../../../../http/http-api.ts';

export const editZipCode = (payload: any): any => {
  return httpApi.patch(`/zip-codes/${payload.id}`, payload);
};
