import { usePaginationFetch } from '../../../../../components/table/use-pagination-fetch.ts';

export const useRetriveZipCodes = (userId: number) => {
  return usePaginationFetch(`/zip-codes/user/${userId}`);
};
