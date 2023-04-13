import { writable } from 'svelte/store';
import { setCookie } from '$lib/cookies';

let font = 'San Serif';

export const fontStore = (() => {
  const { subscribe, update, set } = writable(font);

  const setFont = (newFont: string) => {
    set(newFont);
    setCookie('font', newFont);
  };

  return {
    subscribe,
    set,
    update,
    setFont,
  };
})();
