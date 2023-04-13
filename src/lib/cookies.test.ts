import { test } from 'vitest';
import { setCookie } from './cookies';

test('setCookie sets a cookie with the provided name and value', () => {
  const name = 'test-cookie';
  const value = 'test-value';
  setCookie(name, value);

  const cookies = document.cookie.split('; ');

  const cookie = cookies.find((c) => c.startsWith(name));
  const cookieValue = cookie?.split('=')[1];

  expect(cookieValue).toBe(value);
});
