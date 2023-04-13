import { writable } from 'svelte/store';
import { setCookie } from '$lib/cookies';
import { browser } from '$app/environment';

let theme = 'dark';

export const themeStore = (() => {
  const { subscribe, update, set } = writable(theme);

  const setTheme = (newTheme: string) => {
    set(newTheme);
    document.documentElement.classList.remove(
      newTheme === 'dark' ? 'dark' : 'light'
    );
    document.documentElement.classList.add(
      newTheme === 'dark' ? 'light' : 'dark'
    );
    setCookie('theme', newTheme);
  };

  const toggleTheme = () => {
    update((state) => {
      document.documentElement.classList.remove(
        state === 'dark' ? 'dark' : 'light'
      );
      document.documentElement.classList.add(
        state === 'dark' ? 'light' : 'dark'
      );

      setCookie('theme', state === 'dark' ? 'light' : 'dark');

      return state === 'dark' ? 'light' : 'dark';
    });
  };

  return {
    subscribe,
    set,
    update,
    toggleTheme,
    setTheme,
  };
})();

themeStore.subscribe((state) => {
  if (browser)
    localStorage.setItem('theme', state === 'dark' ? 'dark' : 'light');
});
