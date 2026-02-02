import { HttpAxios } from '../../common/http/http-axios.ts';
import urlJoin from 'url-join';
import { headerApplicationJson } from '../../common/http/headers/header-application-json.ts';
import { getAuthorizationHeader } from './headers/get-authorization-header.ts';
import { errorInterceptor } from './interceptors/error-interceptor.ts';
import { isLoadingInterceptor } from './interceptors/is-loading-interceptor.ts';

export class HttpApplication extends HttpAxios {
  constructor() {
    const apiUrl = import.meta.env.VITE_BASE_URL_API;
    super({
      baseURL: urlJoin(apiUrl, '/api-dev'),
      headers: {
        ...headerApplicationJson,
        ...getAuthorizationHeader(),
      },
    });
  }

  configureInterceptors(): void {
    errorInterceptor(this.service);
    isLoadingInterceptor(this.service);
  }
}

export const httpApi = new HttpApplication();
