import { writable } from 'svelte/store';

export const loadingStore = (() => {
  const { set, update, subscribe } = writable(false);

  return {
    set,
    update,
    subscribe,
  };
})();
