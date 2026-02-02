import { ref } from 'vue';
import type { PaginateResponse } from './types/paginate-response.ts';
import { httpApi } from '../../app/http/http-api.ts';
import type { AxiosRequestConfig } from 'axios';

export const usePaginationFetch = (
  path: string,
  config?: AxiosRequestConfig,
) => {
  const page = ref<number>(1);
  const perPage = ref<number>(1);
  const totalPages = ref<number>(1);
  const response = ref<PaginateResponse | undefined>(undefined);

  const fetch = async () => {
    const data = await httpApi.get<PaginateResponse>(path, {
      ...config,
      params: { page: page.value, perPage: perPage.value },
    });
    response.value = data;
    totalPages.value = data.total;
  };

  const nextPage = async () => {
    page.value++;
    await fetch();
  };

  const prevPage = async () => {
    page.value--;
    await fetch();
  };

  return {
    page,
    perPage,
    totalPages,
    fetch,
    nextPage,
    prevPage,
    response,
  };
};
