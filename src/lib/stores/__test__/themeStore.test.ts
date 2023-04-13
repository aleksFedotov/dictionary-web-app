import { themeStore } from '../themeStore';
import { get } from 'svelte/store';
import * as cookies from '$lib/cookies';

describe('themeStore', () => {
  it('updates the theme when `setTheme` is called', () => {
    const newTheme = 'light';
    const setCookieSpy = jest.spyOn(cookies, 'setCookie');

    themeStore.setTheme(newTheme);
    const newState = get(themeStore);
    expect(newState).toBe(newTheme);
    expect(setCookieSpy).toHaveBeenCalledWith('theme', newTheme);
  });

  it('toggles the theme when `toggleTheme` is called', () => {
    const setCookieSpy = jest.spyOn(cookies, 'setCookie');

    const darkTheme = 'dark';
    const lightTheme = 'light';
    const darkClass = 'dark';
    const lightClass = 'light';
    const htmlElement = document.documentElement;

    // set initial state to dark theme
    themeStore.set(darkTheme);
    expect(htmlElement.classList.contains(darkClass)).toBe(true);
    expect(htmlElement.classList.contains(lightClass)).toBe(false);

    // toggle theme to light
    themeStore.toggleTheme();
    expect(htmlElement.classList.contains(darkClass)).toBe(false);
    expect(htmlElement.classList.contains(lightClass)).toBe(true);
    expect(setCookieSpy).toHaveBeenCalledWith('theme', lightTheme);

    // toggle theme back to dark
    themeStore.toggleTheme();
    expect(htmlElement.classList.contains(darkClass)).toBe(true);
    expect(htmlElement.classList.contains(lightClass)).toBe(false);
    expect(setCookieSpy).toHaveBeenCalledWith('theme', darkTheme);

    setCookieSpy.mockRestore();
  });
});
