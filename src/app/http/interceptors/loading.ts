import { ref } from 'vue';

const isLoading = ref<boolean>(false);

export function useIsLoading() {
  return { isLoading };
}
