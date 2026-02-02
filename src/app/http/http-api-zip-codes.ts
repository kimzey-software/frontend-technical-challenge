import { HttpAxios } from '../../common/http/http-axios.ts';
import urlJoin from 'url-join';
import { headerApplicationJson } from '../../common/http/headers/header-application-json.ts';
import { errorInterceptor } from './interceptors/error-interceptor.ts';
import { isLoadingInterceptor } from './interceptors/is-loading-interceptor.ts';

export class HttpApiZipCodes extends HttpAxios {
  constructor() {
    const apiZipCodes = import.meta.env.VITE_BASE_URL_API_ZIP_CODE;
    super({
      baseURL: urlJoin(apiZipCodes, 'us'),
      headers: {
        ...headerApplicationJson,
      },
    });
  }

  configureInterceptors(): void {
    errorInterceptor(this.service);
    isLoadingInterceptor(this.service);
  }
}

export const httpApiZipCodes = new HttpApiZipCodes();
