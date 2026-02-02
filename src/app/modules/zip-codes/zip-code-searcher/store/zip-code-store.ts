import type { ZipCodeDto } from '../common/types/zip-code-dto.ts';

export const useZipCodesNotSaved = defineStore('ZipCodesNotSaved', {
  state: (): ZipCodeDto[] => [] as ZipCodeDto[],
  getters: {
    zipCodesNotSaved: state => state,
  },
  actions: {
    pushZipCode(zipCode: ZipCodeDto) {
      this.push(zipCode);
    },
  },
});
