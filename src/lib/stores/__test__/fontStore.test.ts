import { render, fireEvent, cleanup } from '@testing-library/svelte';
import { fontStore } from '../fontStore';

import * as cookies from '$lib/cookies';
import { get } from 'svelte/store';
import { vi } from 'vitest';

// const setCookie = jest.fn();

// jest.mock('$lib/cookies', () => ({
//   setCookie,
// }));

describe('fontStore', () => {
  beforeEach(cleanup);

  test('should update font when setFont is called', async () => {
    const newFont = 'Mono';

    const setFontSpy = jest.spyOn(fontStore, 'setFont');
    const { setFont } = fontStore;

    setFont(newFont);

    expect(setFontSpy).toHaveBeenCalledWith(newFont);
    expect(fontStore).toHaveProperty('subscribe');

    const res = get(fontStore);
    expect(res).toBe(newFont);
  });

  test('should update cookie when setFont is called', () => {
    const newFont = 'Mono';

    const setCookieSpy = vi.spyOn(cookies, 'setCookie');
    const { setFont } = fontStore;

    setFont(newFont);

    expect(setCookieSpy).toHaveBeenCalledWith('font', newFont);
  });
});
