import { httpApi } from '../../../../http/http-api.ts';
import type { LocationQueryValue } from 'vue-router';

export const deleteZipCode = (id: string | null | LocationQueryValue[]) => {
  return httpApi.delete(`/zip-codes/${id}`);
};
