import { defineStore } from 'pinia';

export const useOverlayStore = defineStore('overlayStore', {
  state: (): { open: boolean } => ({ open: false }),
  getters: {
    openState: state => state.open,
  },
  actions: {
    openOverlay() {
      this.open = true;
    },
    closeOverlay() {
      this.open = false;
    },
  },
});
