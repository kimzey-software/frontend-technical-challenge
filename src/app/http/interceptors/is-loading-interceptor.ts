import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useIsLoading } from './loading.ts';
const { isLoading } = useIsLoading();
import { useStatusCode } from './status-code.ts';
import store from '../../../store.ts';
import { useOverlayStore } from '../../../components/overlay/store/overlay-store.ts';
const { statusCode } = useStatusCode();

export const isLoadingInterceptor = (axiosInstance: AxiosInstance) => {
  const overlayStore = useOverlayStore(store);
  axiosInstance.interceptors.request.use(
    config => {
      isLoading.value = true;
      overlayStore.openOverlay();
      return config;
    },
    error => {
      isLoading.value = false;
      overlayStore.closeOverlay();
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      isLoading.value = false;
      overlayStore.closeOverlay();
      statusCode.value = response.status;
      return response;
    },
    (error: AxiosError) => {
      isLoading.value = false;
      overlayStore.closeOverlay();
      return Promise.reject(error);
    },
  );
};
