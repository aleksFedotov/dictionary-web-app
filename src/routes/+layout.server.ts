import { fontStore } from '$lib/stores/fontStore.js';
import { themeStore } from '$lib/stores/themeStore';

export const load = ({ cookies }) => {
  const themeCookie = cookies.get('theme');
  const fontCookie = cookies.get('font');
  if (themeCookie) {
    themeStore.set(themeCookie);
  }

  if (fontCookie) {
    fontStore.set(fontCookie);
  }
  return {
    themeCookie,
    fontCookie,
  };
};
