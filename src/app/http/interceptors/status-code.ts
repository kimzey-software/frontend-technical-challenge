import { ref } from 'vue';

const statusCode = ref<any>(undefined);

export function useStatusCode() {
  return { statusCode };
}

export const statusCodes = [404, 401, 403];
